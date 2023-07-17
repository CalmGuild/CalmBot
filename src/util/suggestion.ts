import { Message, Client, MessageEmbed } from "discord.js";

export const editSuggestion = async (message: Message, action: "ACCEPT" | "DENY"): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    const accept = action === "ACCEPT";

    const newEmbed = new MessageEmbed(message.embeds[0]).setColor(accept ? "GREEN" : "RED").setTitle(`Suggestion: ${accept ? "accepted" : "denied"}`);
    message.edit({ embeds: [newEmbed] }).then(() => resolve(true)).catch(reject);
  });
};

export const validateSuggestion = (client: Client, message: Message): boolean => message.embeds.length === 1 && (message.embeds[0]?.title?.startsWith("Suggestion:") ?? false) && message.author.id === client.user?.id;
