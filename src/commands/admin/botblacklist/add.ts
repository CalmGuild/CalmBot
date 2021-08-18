import { GuildMember, MessageMentions } from "discord.js";
import { ICommandSettings } from "../../../structures/interfaces";
import PermissionHandler from "../../../util/PermissionHandler";

const command: ICommandSettings = {
  run: async (client, message, args, settings) => {
    if (!settings || !message.guild) return;

    let member: GuildMember | void;
    if (new RegExp(MessageMentions.USERS_PATTERN).test(args[0]!!)) {
      const id = args[0]!!.substring(3, args[0]!!.length - 1);
      member = await message.guild.members.fetch(id).catch(() => {});
    } else member = await message.guild.members.fetch(args[0]!!).catch(() => {});

    if (!member || PermissionHandler.isAdmin(member)) {
      client.reply(message, "Couldn't find member or member cannot be blacklisted!");
      return;
    }

    if (settings.botBlacklist.includes(member.id)) {
      client.reply(message, "Member already blacklisted");
      return;
    }

    settings.botBlacklist.push(member.id);
    await settings.save();
    client.reply(message, `${member.user.tag} added!`);
  },
  description: "Adds a user to the bot blacklist!",
  usage: "botblacklist add <userid or mention user>",
};

export default command;
