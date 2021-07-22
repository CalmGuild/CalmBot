import { IButtonInteraction } from "../../structures/interfaces";

const event: IButtonInteraction = {
  run: (client, interaction) => {
    if (interaction.customId.split("_")[1] && interaction.user.id !== interaction.customId.split("_")[1]) {
      interaction.reply({ content: "You can not do that!", ephemeral: true });
      return;
    }
    interaction.channel?.messages
      .fetch(interaction.message.id)
      .then((msg) => msg.delete())
      .catch(() => interaction.reply({ content: "Could not delete message?", ephemeral: true }));
  },
  validator: (button) => button.customId.toLowerCase().startsWith("deleteme"),
};

export default event;