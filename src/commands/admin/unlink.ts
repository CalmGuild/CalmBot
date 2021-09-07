/*
    let member: GuildMember | void;
    if (new RegExp(MessageMentions.USERS_PATTERN).test(args[0]!!)) {
      const id = args[0]!!.substring(3, args[0]!!.length - 1);
      member = await message.guild.members.fetch(id).catch(() => {});
    } else member = await message.guild.members.fetch(args[0]!!).catch(() => {});
*/

import { MessageMentions, User as DiscordUser } from "discord.js";
import User, { IUser } from "../../schemas/User";
import { ICommandSettings } from "../../structures/interfaces";

const command: ICommandSettings = {
  run: async (client, message, args) => {
    let user: IUser | null = null;

    let discordUser: DiscordUser | void;
    if (new RegExp(MessageMentions.USERS_PATTERN).test(args[0]!!)) {
      const id = args[0]!!.substring(3, args[0]!!.length - 1);
      discordUser = await client.users.fetch(id).catch(() => {});
    } else discordUser = await client.users.fetch(args[0]!!).catch(() => {});

    if (!discordUser) {
      user = await User.findOne({minecraftUUID: args[0]!!})
    } else {
      user = await User.findOne({discordId: discordUser.id})
    }

    if (!user || !user.minecraftUUID) {
      message.channel.send(`Failed to unlink ${args[0]}`);
      return;
    }

    user.minecraftUUID = undefined;
    await user.save()
    message.reply("Unlinked!");
  },
  description: "Unlink a user from their minecraft account!",
  usage: "unlink <uuid | discordid | @discorduser>",
  minArgs: 1,
  guildOnly: true,
  permissions: ["ADMIN"]
};

export default command;
