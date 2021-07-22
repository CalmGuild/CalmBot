import { Interaction } from "discord.js";
import Client from "../structures/Client";
import Utils from "../util/Utils";

export default function interactionCreate(client: Client, interaction: Interaction) {
  if (!interaction.isMessageComponent()) return;
  if (interaction.isButton()) {
    const event = Utils.findAll(client.buttonInteractions!!, (e) => e.validator(interaction))
    if (event) event.forEach((e) => e.run(client, interaction))
  } else if (interaction.isSelectMenu()) {
    const event = Utils.findAll(client.selectMenuInteractions!!, (e) => e.validator(interaction))
    if (event) event.forEach((e) => e.run(client, interaction))
  }
}