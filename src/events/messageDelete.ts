import { Message, TextChannel } from "discord.js";
import SkullMessage, { ISkullMessage } from "../schemas/SkullMessage";
import Client from "../structures/Client";

export default async function messageReactionDelete(client: Client, message: Message) {
  if (!message.guild) return;

  const guildSettings = await client.getSettings(message.guild.id);

  const skullboardChannelId = guildSettings.skullboardChannel;
  const skullboard = skullboardChannelId ? message.guild.channels.cache.get(skullboardChannelId) : undefined;

  if (!skullboard || !(skullboard instanceof TextChannel)) return;
  
  const skulledMessage: ISkullMessage | null = await SkullMessage.findOne({ origianlMessageId: message.id });
  if (skulledMessage) {
    await SkullMessage.findOneAndDelete({ origianlMessageId: skulledMessage.origianlMessageId });
    await skullboard.messages
      .fetch(skulledMessage.skullboardMessageId)
      .then((m) => m.delete())
      .catch(console.error);
  }
}
