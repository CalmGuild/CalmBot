import { Message, Client, MessageEmbed, GuildMember, EmbedFieldData, EmbedField } from "discord.js";

export const editSuggestion = async (message: Message, editor: GuildMember, action: "ACCEPT" | "DENY"): Promise<boolean> => {
  return new Promise(async (resolve, reject) => {
    if (!message.embeds[0]) return;
    const accept = action === "ACCEPT";

    const newEmbed = new MessageEmbed(message.embeds[0]).setColor(accept ? "GREEN" : "RED").setTitle(`Suggestion: ${accept ? "Accepted" : "Denied"}`);

    const fields: EmbedFieldData[] = [{ name: `${accept ? "Accepted" : "Denied"} by:`, value: editor.user.toString(), inline: true }];
    
    const votes = message.embeds[0].fields.filter((field) => field.name == "Upvotes:" || field.name == "Downvotes:");
    if (votes.length == 0) votes.push(...(await getVotes(message)));

    newEmbed.setFields(fields, votes);

    message
      .edit({ embeds: [newEmbed] })
      .then(async (msg) => {
        await msg.reactions.removeAll();
        resolve(true);
      })
      .catch(reject);
  });
};

export const validateSuggestion = (client: Client, message: Message): boolean => message.embeds.length === 1 && (message.embeds[0]?.title?.startsWith("Suggestion:") ?? false) && message.author.id === client.user?.id;

const getVotes = async (message: Message): Promise<EmbedField[]> =>
  new Promise(async (resolve, reject) => {
    const upvotes = await message.reactions.resolve("✅")?.fetch();
    const downvotes = await message.reactions.resolve("❎")?.fetch();

    resolve([
      { name: "Upvotes:", value: upvotes?.count.toString() ?? "0", inline: true },
      { name: "Downvotes:", value: downvotes?.count.toString() ?? "0", inline: true },
    ]);
  });
