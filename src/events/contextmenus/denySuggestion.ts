import { GuildMember, Message } from "discord.js";
import { IContextMenuInteraction } from "../../structures/interfaces";
import PermissionHandler from "../../util/PermissionHandler";
import { editSuggestion, validateSuggestion } from "../../util/suggestion";
import { ContextMenuCommandBuilder } from "@discordjs/builders";
import { ApplicationCommandType } from "discord-api-types/v10";

const event: IContextMenuInteraction = {
  run: (client, interaction) => {
    if (!interaction.isMessageContextMenu() || !interaction.inGuild() || !(interaction.member instanceof GuildMember)) return;

    if (!PermissionHandler.isAdmin(interaction.member)) {
      interaction.reply({ content: "You lack ADMIN permission MORON", ephemeral: true });
      return;
    }

    const message = interaction.targetMessage;
    if (!(message instanceof Message)) return;

    if (!validateSuggestion(client, message)) {
      interaction.reply({ content: "Message is not a suggestion", ephemeral: true });
      return;
    }

    editSuggestion(message, interaction.member, "DENY").then(() => interaction.reply({ content: `Suggestion denied`, ephemeral: true }));
  },
  data: new ContextMenuCommandBuilder().setName("Deny Suggestion").setType(ApplicationCommandType.Message),
};

export default event;
