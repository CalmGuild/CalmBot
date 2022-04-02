import { Message } from "discord.js";
import User from "../../schemas/User";
import { IButtonInteraction } from "../../structures/interfaces";
import PromptManager from "../../managers/PromptManager";
import Utils from "../../util/Utils";
import { Channels } from "../../util/constants";

const event: IButtonInteraction = {
  run: async (client, interaction) => {
    const userId = interaction.customId.split("_")[1]!;

    new PromptManager(
      client,
      interaction.user,
      interaction.channel!,
      [
        {
          id: "reason",
          question: "What is the reason for denial?",
          validation: { validator: (message) => message.content.length > 0, errorMessage: "You must include text" },
        },
      ],
      async (answers) => {
        const user = await User.findOne({ discordId: userId });

        if (!user!.inactivePending) return;

        const reason = answers.get("reason")!;
        client.users
          .fetch(userId)
          .then((user) => {
            const inactivityChannel = Utils.getChannel(interaction.guild!, Channels.INACTIVITY);
            user.send(`Sorry your inactivity request for calm has been denied because of:\n${reason}\n\nIf you have any questions please open a ticket in the discord and we would be happy to help`).catch(() => {
              if (inactivityChannel && inactivityChannel.isText()) {
                inactivityChannel.send(`Denied ${user}'s inactivity request but their dms were closed so I could not inform them of it.`);
              }
            });
            if (inactivityChannel && inactivityChannel.isText()) {
              inactivityChannel.send(`${user}'s inactivity request denied by ${interaction.user}`)
            }
          })
          .catch(() => {});

        if (interaction.message instanceof Message) {
          interaction.message
            .edit({
              components: Utils.disableButtons(interaction.message.components, { disableAll: true }),
            })
            .catch(() => {});
        }

        user!.inactive = false;
        user!.inactivePending = false;
        user!.inactiveReason = undefined;
        await user!.save();
      }
    ).start();
  },
  validator: (button) => button.customId.toLowerCase().startsWith("denyinactivity") && button.inGuild(),
};

export default event;
