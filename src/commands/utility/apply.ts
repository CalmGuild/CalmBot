import { CategoryChannel, MessageButton, MessageEmbed, OverwriteResolvable, PermissionString } from "discord.js";
import { getGuild } from "../../api/hypixel";
import { ICommandSettings } from "../../structures/interfaces";
import constants, { Roles } from "../../util/constants";
import Utils from "../../util/Utils";

const questions = [
  "Age/age range (must be 13 or older)",
  "Gamemode you are applying with?",
  "What was your past guild and your reason for leaving/getting kicked?",
  "Have you ever been punished on Hypixel before? If so, please explain when and why (if you remember)",
  "Where did you hear about Calm, and why did you choose us?",
  "Do you have any friends in the guild? (This will not affect your application in anyway)",
  "Is someone vouching for you? If so who?",
  "Anything you wish to add?",
].map((question) => `**${question}:**\n\n`);

const command: ICommandSettings = {
  run: async (client, message, args, settings) => {
    const user = await Utils.getUser(message.author.id);
    if (!user.minecraftUUID) {
      message.reply(`You must link your hypixel account to discord before applying! Please use the ${client.prefix}link (ign) command!`);
      return;
    }

    let inGuild = false;
    const guild = await getGuild(constants.CALM_GUILD_ID).catch(console.error)
    if (guild) inGuild = guild.members.find((m) => m.uuid === user.minecraftUUID) !== undefined;

    if (inGuild || settings!.waitlist.find((w) => w.user === message.author.id)) {
      message.reply(`You are already in the guild or on the waitlist!`);
      return;
    }

    const exitingApplication = settings?.applicants.get(message.author.id);
    if (exitingApplication) {
      if (!message.guild!.channels.cache.has(exitingApplication.channelId)) {
        settings!.applicants.delete(message.author.id);
        await settings?.save();
      } else {
        message.reply(`You already got an application open ${exitingApplication.pendingReview ? "that is pending review" : `<#${exitingApplication.channelId}>`}`);
        return;
      }
    }

    let overwrites: OverwriteResolvable[] = [
      { deny: "VIEW_CHANNEL", id: message.guild!.roles.everyone.id },
      { allow: <PermissionString[]>constants.CHANNEL_ALLOW_PERMISSIONS, id: message.author.id },
    ];

    const applicationsTeam = Utils.getRole(message.guild!, Roles.APPLICATIONS_TEAM);
    if (applicationsTeam) overwrites.push({ allow: <PermissionString[]>constants.CHANNEL_ALLOW_PERMISSIONS, id: applicationsTeam.id });

    const applicationCategory = message.guild!.channels.cache.find((c) => c.name.toLowerCase() === "apps" && c.type === "GUILD_CATEGORY") as CategoryChannel;
    const name = await client.minecraftNames.getName(user.minecraftUUID);
    message.guild?.channels
      .create(`app-${name}`, { topic: `${name}'s guild application`, parent: applicationCategory, permissionOverwrites: overwrites })
      .then(async (channel) => {
        settings!.applicants.set(message.author.id, { channelId: channel.id, pendingReview: false });
        await settings?.save();
        const embed = new MessageEmbed()
          .setTitle("Calm Guild Application")
          .setDescription(
            `**How To Apply:**\nPlease answer the following questions and then send them in this channel. When you are finished, click "Submit Application" so staff may review it. If you don\'t wish to apply anymore, click "Exit"\n\n${questions.join(
              ""
            )}`
          )
          .setColor("#f58ad9")
          .setTimestamp();

        const submitButton = new MessageButton().setStyle("SUCCESS").setLabel("Submit Application").setCustomId(`submitApplication_${message.author.id}`);
        const exitButton = new MessageButton().setStyle("DANGER").setLabel("Exit").setCustomId(`exitApplication_${message.author.id}`);

        channel.send({ content: message.author.toString(), embeds: [embed], components: [{ type: "ACTION_ROW", components: [submitButton, exitButton] }] });
        message.reply(`Created your application, ${channel}`)
      })
      .catch((err) => {
        if (client.webhook) client.webhook.sendError(err);
        message.reply("There was an error creating that application. Please contact staff");
        console.error(err);
      });
  },
  description: "Creates an application for you to apply to calm guild!",
  usage: "apply",
  guildOnly: true,
};

export default command;
