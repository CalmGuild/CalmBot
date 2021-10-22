import { IButtonInteraction } from "../../structures/interfaces";
import PromptManager from "../../util/PromptManager";

const event: IButtonInteraction = {
  run: async (client, interaction) => {
    const userId = interaction.customId.split("_")[1]!!;
    const settings = await client.getSettings(interaction.guild!!.id)!!;

    const application = settings.applicants.get(userId);
    if (!application) {
      interaction.reply({ content: "Couldn't find application. You should contact a developer.", ephemeral: true });
      return;
    }

    new PromptManager(
      client,
      interaction.user,
      interaction.channel!!,
      [
        {
          id: "reason",
          question: "What is the reason for denial?",
          validation: { validator: (message) => message.content.length > 0, errorMessage: "You must include text" },
        },
      ],
      async (answers) => {
        const reason = answers.get("reason")!!;
        client.users.fetch(userId).then((user) => {
          user.send(`Sorry your application to calm has been denied because of:\n${reason}\n\nIf you have any questions please open a ticket in discord.gg/calm and we would be happy to help`);
        }).catch()
        settings.applicants.delete(userId);
        await settings.save();
        interaction.channel?.delete();
      }
    ).start();
  },
  validator: (interaction) => interaction.customId.toLowerCase().startsWith("denyapplication") && interaction.guild !== null,
};

export default event;
