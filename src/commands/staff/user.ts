import { MessageEmbed, MessageMentions, User as DiscordUser } from "discord.js";
import { ICommandSettings } from "../../structures/interfaces";
import constants from "../../util/constants";
import { getGuild } from "../../api/hypixel";
import Utils from "../../util/Utils";
import User, { IUser } from "../../schemas/User";
import getUUIDFromName from "../../api/mojang";

const command: ICommandSettings = {
  run: async (client, message, args) => {
    let discordUser: DiscordUser | void;
    if (new RegExp(MessageMentions.USERS_PATTERN).test(args[0]!)) {
      const id = args[0]!.substring(3, args[0]!.length - 1);
      discordUser = await client.users.fetch(id).catch(() => {});
    } else discordUser = await client.users.fetch(args[0]!).catch(() => {});

    let user: IUser | undefined = undefined;

    if (!discordUser) {
      let uuid = await getUUIDFromName(args[0]!).catch(() => {});
      
      if (uuid) user = await User.findOne({ minecraftUUID: uuid }) ?? undefined;

      if (!user) {
        message.reply("Invalid discord user.\nUsage: <discordid | @discorduser | minecraft-ign>");
        return;
      }
    }

    if (!user && discordUser) user = await Utils.getUser(discordUser.id);
    if (!user) return;

    let minecraftName = undefined;
    let inGuild = false;
    if (user.minecraftUUID) {
      minecraftName = await client.minecraftNames.getName(user.minecraftUUID);
      const guild = await getGuild(constants.CALM_GUILD_ID).catch((err) => {
        console.error(err);
      });

      inGuild = guild?.members.some((member) => member.uuid === user!.minecraftUUID) ?? false;
    }
    const embed = new MessageEmbed()
      .setColor("YELLOW")
      .setDescription(`<@${user.discordId}>'s user data${!user.minecraftUUID ? "\n**Note:** This user does not have any minecraft data linked to their account" : ""}`)
      .addField("Discord ID", user.discordId);
    if (user.minecraftUUID) {
      embed.addField("Minecraft name", minecraftName ?? user.minecraftUUID);
      embed.addField("In Calm Guild", inGuild.toString());
    }
    message.reply({ embeds: [embed] });
  },
  description: "Get user data of a member!",
  usage: "user <discordid | @discorduser | minecraft-ign>",
  minArgs: 1,
  guildOnly: true,
  permissions: ["STAFF"],
};

export default command;
