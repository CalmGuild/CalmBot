import { Message } from "discord.js";
import { IButtonInteraction } from "../../structures/interfaces";
import PromptManager from "../../managers/PromptManager";
import Utils from "../../util/Utils";

const event: IButtonInteraction = {
  run: async (client, interaction) => {
    if (!(interaction.message instanceof Message)) return;

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

    prompt.instance.exit();
    interaction.message.edit({
      content: interaction.message.content,
      components: Utils.disableButtons(interaction.message.components, { disableAll: true }),
    });
    interaction.reply("Exited the prompt!");
  },
  validator: (button) => button.customId.toLowerCase().startsWith("exitprompt"),
};

export default event;
