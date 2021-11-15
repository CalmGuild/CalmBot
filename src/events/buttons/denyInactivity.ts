import { Message } from "discord.js";
import User from "../../schemas/User";
import { IButtonInteraction } from "../../structures/interfaces";
import Utils from "../../util/Utils";

const event: IButtonInteraction = {
  run: async (client, interaction) => {
    if (!(interaction.message instanceof Message)) return;

    const userId = interaction.customId.split("_")[1]!;
    const user = await User.findOne({ discordId: userId });
    user!.inactive = false;
    user!.inactivePending = false;
    user!.inactiveExpires = undefined;
    user!.inactiveReason = undefined;
    await user!.save();

    interaction.message.edit({
      components: Utils.disableButtons(interaction.message.components, { disableAll: true }),
    });

    interaction.reply("Denied inactivity. Please inform them of the reason.");
  },
  validator: (button) => button.customId.toLowerCase().startsWith("denyinactivity") && button.inGuild(),
};

export default event;
