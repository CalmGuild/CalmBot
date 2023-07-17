import { IContextMenuInteraction } from "../../structures/interfaces";

const event: IContextMenuInteraction = {
  run: (client, interaction) => {
    if (!interaction.isMessageContextMenu()) return;
    
  },
  validator: (interaction) => interaction.commandName.toLowerCase() === "acceptsuggestion" && interaction.isMessageContextMenu()
}

export default event;