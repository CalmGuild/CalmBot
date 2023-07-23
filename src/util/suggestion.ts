import { Message, Client, MessageEmbed, GuildMember } from "discord.js";

export const editSuggestion = async (message: Message, editor: GuildMember, action: "ACCEPT" | "DENY"): Promise<boolean> => {
  return new Promise(async (resolve, reject) => {
    const accept = action === "ACCEPT";

    const upvotes = await message.reactions.resolve("✅")?.fetch();
    const dwonvotes = await message.reactions.resolve("❎")?.fetch();

    const newEmbed = new MessageEmbed(message.embeds[0]).setColor(accept ? "GREEN" : "RED").setTitle(`Suggestion: ${accept ? "Accepted" : "Denied"}`);
    newEmbed.addFields([
      { name: `${accept ? "Accepted" : "Denied"} by:`, value: editor.user.toString(), inline: true },
      { name: "Upvotes:", value: upvotes?.count.toString() ?? "0", inline: true },
      { name: "Downvotes:", value: dwonvotes?.count.toString() ?? "0", inline: true },
    ]);

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
