import { Channel, MessageMentions, TextChannel } from "discord.js";
import { ICommandSettings } from "../../../structures/interfaces";

const command: ICommandSettings = {
  run: async (client, message, args, settings) => {
    let channel: Channel | undefined;
    if (new RegExp(MessageMentions.CHANNELS_PATTERN).test(args[0]!!)) {
      const id = args[0]!!.substring(2, args[0]!!.length - 1);
      console.log(id);

      channel = message.guild!!.channels.cache.get(id);
    } else channel = message.guild!!.channels.cache.get(args[0]!!);

    if (!channel || !(channel instanceof TextChannel)) {
      message.reply("Invalid channel.");
      return;
    }

    settings!!.waitlistChannel = channel.id;
    await settings?.save();
    message.reply(`Set waitlist channel to ${channel}`);
  },
  description: "Sets the channel to send all the waitlist pings in!",
  usage: "waitlist setchannel (channel)",
  permissions: ["ADMIN"],
  aliases: ["channel"],
  minArgs: 1,
  guildOnly: true,
};

export default command;
