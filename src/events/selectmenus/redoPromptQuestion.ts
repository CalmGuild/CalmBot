import { ISelectMenuInteraction } from "../../structures/interfaces";
import PromptManager from "../../managers/PromptManager";

const event: ISelectMenuInteraction = {
  run: (client, interaction) => {
    const args = interaction.customId.split("_");
    const channelId = args[1]!;
    const userId = args[2]!;

    if (userId !== interaction.user.id) {
      interaction.reply({ content: "You cannot do that!", ephemeral: true });
      return;
    }

    const prompt = PromptManager.prompts.find((prompt) => prompt.channel.id === channelId && prompt.user.id === userId);
    if (!prompt) {
      interaction.reply({ content: "No prompt found!", ephemeral: true });
      return;
    }

    if (prompt.instance.isRedoing()) {
      interaction.reply({ content: "Already being redone", ephemeral: true });
      return;
    }

    const index = parseInt(interaction.values[0]!);
    prompt.instance.handleRedo(index, interaction);
  },
  validator: (interaction) => interaction.customId.toLowerCase().startsWith("redopromptquestion"),
};

export default event;
