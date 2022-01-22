import { Util } from "discord.js";
import User from "../../schemas/User";
import { ICommandSettings } from "../../structures/interfaces";
import { getPlayerFromName as getPlayer } from "../../api/hypixel";
import Utils from "../../util/Utils";

const command: ICommandSettings = {
  run: async (client, message, args) => {
    const user = await Utils.getUser(message.author.id);
    if (user.minecraftUUID) {
      message.reply(`Error: You are already linked to ${user.minecraftUUID}.\nIf this is an issue please open a support ticket so we can sort this out!`);
      return;
    }

    const player = await getPlayer(args[0]!);
    if (!player) {
      message.reply(`Error: Could not find player.\nIf you believe this is an error please open a support ticket so we can help!`);
      return;
    }

    const alreadyExistingUser = await User.findOne({ minecraftUUID: player.uuid });

    if (alreadyExistingUser !== null) {
      message.reply(`Error: The UUID of this player is already linked to a discord account.\nIf you believe this is an error please open a support ticket so we can help!`);
      return;
    }

    if (!player.socialMedia?.links?.DISCORD) {
      message.reply(
        `Error: No discord linked to hypixel.\nHow to link discord to hypixel: https://hypixel.net/threads/guide-how-to-link-discord-to-your-hypixel-profile.3179351/\n\nIf you believe this is an error please open a support ticket so we can help!`
      );
      return;
    }

    if (player.socialMedia.links.DISCORD !== message.author.tag) {
      message.reply(`This account is linked to: ${Util.escapeMarkdown(player.socialMedia.links.DISCORD)}\nPlease relink your account to match your current name and tag (case sensitive)`);
      return;
    }

    user.minecraftUUID = player.uuid;
    await user.save();

    message.reply(`Success! Linked to ${args[0]}`);
  },
  description: "Link your hypixel and discord account!",
  usage: "link <mc-username>",
  minArgs: 1,
};

export default command;
