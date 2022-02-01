import { MessageMentions, User as DiscordUser } from "discord.js";
import User from "../../schemas/User";
import { ICommandSettings } from "../../structures/interfaces";
import { getPlayerFromName as getPlayer } from "../../api/hypixel";
import Utils from "../../util/Utils";

const command: ICommandSettings = {
  run: async (client, message, args) => {
    let discordUser: DiscordUser | void;
    if (new RegExp(MessageMentions.USERS_PATTERN).test(args[0]!)) {
      const id = args[0]!.substring(3, args[0]!.length - 1);
      discordUser = await client.users.fetch(id).catch(() => {});
    } else discordUser = await client.users.fetch(args[0]!).catch(() => {});

    if (!discordUser) {
      message.channel.send("Invalid discord user.\nUsage: <discordid | @discorduser> <minecraft-name>");
      return;
    }

    const user = await Utils.getUser(discordUser.id);
    if (user.minecraftUUID) {
      message.channel.send(`User already linked to ${user.minecraftUUID}`)
      return;
    }

    const player = await getPlayer(args[1]!);
    if (!player) {
      message.channel.send(`Invalid player name ${args[1]!}`)
      return;
    }

    const alreadyExistingUser = await User.findOne({minecraftUUID: player.uuid})
    
    if (alreadyExistingUser !== null) {
      message.channel.send(`This player is already linked to ${alreadyExistingUser.discordId}!`)
      return;
    }

    user.minecraftUUID = player.uuid;
    await user.save()
    message.channel.send(`Success! Linked ${discordUser.tag} to ${player.playername}`);

  },
  description: "forcelink a user to their minecraft account!",
  usage: "forcelink <discordid | @discorduser> <minecraft-name>",
  minArgs: 2,
  guildOnly: true,
  permissions: ["STAFF"],
};

export default command;
