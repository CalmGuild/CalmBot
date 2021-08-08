import { MessageActionRow, MessageButton, MessageEmbed, MessageSelectMenu } from "discord.js";
import { ICommandSettings } from "../../structures/interfaces";

const command: ICommandSettings = {
  run: (client, message, args) => {
    const suggestionText: string | undefined = args.length !== 0 ? args.join(" ") : undefined;
    const suggestionAttachment: string | undefined = message.attachments.size !== 0 && message.attachments.first()!!.contentType?.startsWith("image") ? message.attachments.first()?.url : undefined;
    if (!suggestionText && !suggestionAttachment) {
      client.reply(message, "You must atleast have a text suggestion or an attached image.");
      return;
    }

    const embed = new MessageEmbed().setTitle("Please confirm this is your suggestion and when you are done select a suggestion type from the drop down below");
    embed.setColor("AQUA");
    if (suggestionText) embed.setDescription(suggestionText);
    if (suggestionAttachment) embed.setImage(suggestionAttachment);

    const menu = new MessageSelectMenu()
      .setMaxValues(1)
      .setPlaceholder("Suggestion Type:")
      .setCustomId(`createSuggestion_${message.author.id}`)
      .addOptions([
        { label: "Regular Suggestion", description: "Does not fall into any of the other categories", value: "regular", emoji: "🗨️" },
        { label: "Emote Suggestion", description: "A suggestion for a new emoji (or sticker)", value: "emote",  emoji: "😀" },
        { label: "Movie Suggestion", description: "Suggestion for a movie to watch during movie night", value: "movie", emoji: "🎥"}
      ]);
    
    const exitButton = new MessageButton().setLabel("Exit").setCustomId(`deleteMe_${message.author.id}`).setEmoji("❎").setStyle("DANGER");
    
    const rowOne = new MessageActionRow().addComponents(menu);
    const rowTwo = new MessageActionRow().addComponents(exitButton);
    client.reply(message, {embeds: [embed], components: [rowOne, rowTwo]});
  },
  description: "Create a suggestion for the server",
  usage: "suggestion <suggestion in text or image attachment or both>",
  aliases: ["emotesuggestion", "challengesuggestion", "suggestion", "moviesuggestion"],
  guildOnly: true,
};

export default command;
