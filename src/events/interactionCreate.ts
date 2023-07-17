import { Interaction } from "discord.js";
import GuildSettings from "../schemas/GuildSettings";
import Client from "../structures/Client";
import Utils from "../util/Utils";

export default async function interactionCreate(client: Client, interaction: Interaction) {
  if (!interaction.isMessageComponent() && !interaction.isContextMenu()) return;

  if (interaction.guildId) {
    let settings = await GuildSettings.findOne({ guildID: interaction.guildId });
    if (settings === null) {
      settings = new GuildSettings({ guildID: interaction.guildId });
      await settings.save();
    }

    if (settings.botBlacklist.includes(interaction.user.id)) {
      interaction.reply({ content: "You are blacklisted from using the bot!", ephemeral: true });
      return;
    }
  }

  if (interaction.isButton()) {
    const event = Utils.findAll(client.buttonInteractions!, (e) => e.validator(interaction));
    if (event) event.forEach((e) => e.run(client, interaction));
  } else if (interaction.isSelectMenu()) {
    const event = Utils.findAll(client.selectMenuInteractions!, (e) => e.validator(interaction));
    if (event) event.forEach((e) => e.run(client, interaction));
  } else if (interaction.isMessageContextMenu()) {    
    const event = Utils.findAll(client.contextMenuInteraction!, (e) => e.data.name === interaction.commandName);
    if (event) event.forEach((e) => e.run(client, interaction));
  }
}
