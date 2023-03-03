import { MessageReaction, TextChannel, User } from "discord.js";
import SkullMessage, { ISkullMessage } from "../schemas/SkullMessage";
import Client from "../structures/Client";
import { createSkullboardMessage, updateSkullboardMessage } from "../util/skullboard";

export default async function messageReactionAdd(client: Client, messageReaction: MessageReaction, user: User) {
  if (!messageReaction.message.guild) return;

  await messageReaction.fetch().catch(console.error);
  const emojiCount = messageReaction.count;

  if (messageReaction.emoji.name === "💀" && emojiCount >= 5) {
    const guildSettings = await client.getSettings(messageReaction.message.guild.id);

    const skullboardChannelId = guildSettings.skullboardChannel;
    const skullboard = skullboardChannelId ? messageReaction.message.guild.channels.cache.get(skullboardChannelId) : undefined;
    if (!skullboard || !(skullboard instanceof TextChannel)) return;

    let skulledMessage: ISkullMessage | null = await SkullMessage.findOne({ origianlMessageId: messageReaction.message.id });
    if (skulledMessage === null) {
      createSkullboardMessage(messageReaction, user, skullboard);
      return;
    }

    updateSkullboardMessage(messageReaction, skulledMessage, skullboard);
  }
}
