import { GuildMember, MessageMentions } from "discord.js";
import { ICommandSettings } from "../../../structures/interfaces";

const command: ICommandSettings = {
  run: async (client, message, args, settings) => {
    if (!settings || !message.guild) return;

    let member: GuildMember | void;
    if (new RegExp(MessageMentions.USERS_PATTERN).test(args[0]!!)) {
      const id = args[0]!!.substring(3, args[0]!!.length - 1);
      member = await message.guild.members.fetch(id).catch(() => {});
    } else member = await message.guild.members.fetch(args[0]!!).catch(() => {});

    if (!member || !settings.botBlacklist.includes(member.id)) {
      client.reply(message, "Member not blacklisted!");
      return;
    }

    settings.botBlacklist = settings.botBlacklist.filter((ele) => ele !== member!!.id);
    await settings.save();
    client.reply(message, `${member.user.tag} removed!`);
  },
  description: "Removes a user from the bot blacklist!",
  usage: "botblacklist remove <userid or mention user>",
};

export default command;
