import { MessageEmbed, MessageSelectMenu } from "discord.js";
import User from "../../schemas/User";
import { ICommandSettings } from "../../structures/interfaces";
import { getGuild } from "../../util/hypixel";

const command: ICommandSettings = {
  run: async (client, message, args, settings) => {
    const user = await User.findOne({ discordId: message.author.id });
    if (!user || !user.minecraftUUID) {
      message.reply("Please link your minecraft account to your discord using c!link");
      return;
    }

    getGuild()
      .then(async (hypixelGuild) => {
        if (!hypixelGuild?.members.some((member) => member.uuid === user.minecraftUUID)) {
          message.reply("You are not in calm guild!");
          return;
        }

        if (user.inactivePending || user.inactive) {
          message.reply(`You already ${user.inactive ? "are inactive" : "have an inactivity request pending"}!`);
          return;
        }

        user.inactiveReason = args.join(" ");
        await user.save();
        const embed = new MessageEmbed()
          .setTitle("Inactivity Confirmation")
          .setDescription("Please select a time 1-4 weeks from the dropdown below to confirm your inactivity\n\nIf you have any questions please contact a server staff member")
          .setColor("RED");
        const selectMenu = new MessageSelectMenu()
          .setCustomId(`inactivity_${message.author.id}`)
          .setPlaceholder("Amount of time")
          .addOptions([
            { label: "One week", value: "1w", emoji: "1️⃣" },
            { label: "Two weeks", value: "2w", emoji: "2️⃣" },
            { label: "Three weeks", value: "3w", emoji: "3️⃣" },
            { label: "Four weeks", value: "4w", emoji: "4️⃣" },
          ]);
        message.reply({ embeds: [embed], components: [{ type: "ACTION_ROW", components: [selectMenu] }] });
      })
      .catch((err) => {
        message.reply("There was an error running that command. Please contact a developer.");
        console.error(err);
        return;
      });
  },
  description: "Marks you as inactive and exempts you from gexp requirements!",
  usage: "inactive (reason)",
  guildOnly: true,
  aliases: ["inactivity"],
  minArgs: 1,
};

export default command;
