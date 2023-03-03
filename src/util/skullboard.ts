import { GuildMember, MessageEmbed, MessageReaction, TextChannel, User } from "discord.js";
import SkullMessage, { ISkullMessage } from "../schemas/SkullMessage";

export const createSkullboardMessage = async (messageReaction: MessageReaction, user: User, skullboardChannel: TextChannel) => {
  if (!messageReaction.message.guild) return;

  const member = await messageReaction.message.guild.members.fetch(user.id).catch(console.error);
  if (!member) return;

  const embed = createEmbed(messageReaction, member);
  skullboardChannel
    .send({ content: `💀 ${messageReaction.count} ${messageReaction.message.channel}`, embeds: [embed] })
    .then(async (message) => {
      const doc = new SkullMessage({ origianlMessageId: messageReaction.message.id, skullboardMessageId: message.id });
      await doc.save();
    })
    .catch(console.error);
};

export const updateSkullboardMessage = async (messageReaction: MessageReaction, skulledMessage: ISkullMessage, skullboardChannel: TextChannel) => {
  skullboardChannel.messages
    .fetch(skulledMessage.skullboardMessageId)
    .then(async (message) => {
      if (messageReaction.count < 5) {
        await message.delete();
        await SkullMessage.findOneAndDelete({ origianlMessageId: skulledMessage.origianlMessageId });
      } else message.edit({ content: `💀 ${messageReaction.count} ${messageReaction.message.channel}` });
    })
    .catch(async () => {
      await SkullMessage.findOneAndDelete({ origianlMessageId: skulledMessage.origianlMessageId });
    });
};

const createEmbed = (messageReaction: MessageReaction, member: GuildMember): MessageEmbed => {
  const embed = new MessageEmbed();
  const message = messageReaction.message;

  embed.setAuthor({ name: message.member?.nickname ?? message.author?.username ?? "Unavalaible", iconURL: message.member?.user.avatarURL() ?? message.author?.avatarURL() ?? undefined });

  // Images can either be embeded (user sends image url) or attached (user uploads image)
  if (message.attachments.size > 0 || message.embeds.length > 0) {
    let image = message.attachments.filter((attachment) => attachment.contentType?.startsWith("image") ?? false).first()?.url;
    if (!image) image = message.embeds.filter((embed) => embed.type === "image")[0]?.url ?? undefined;

    if (image) embed.setImage(image);
    else if (message.attachments.size > 0) {
      embed.addFields([{ name: "Attachment", value: message.attachments.first()?.url ?? "Unavaliable" }]);
    }
  }

  if (message.content !== null) embed.setDescription(message.content);

  embed.addFields([{ name: "Source", value: `[Jump!](${message.url})` }]);
  embed.setColor("WHITE");
  embed.setTimestamp();

  return embed;
};
