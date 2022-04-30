import { Message } from "discord.js";
import User from "../../schemas/User";
import { IButtonInteraction } from "../../structures/interfaces";
import { Roles } from "../../util/constants";
import Utils from "../../util/Utils";

const event: IButtonInteraction = {
  run: async (client, interaction) => {
    if (!(interaction.message instanceof Message)) return;

    const userId = interaction.customId.split("_")[1]!;
    const user = await User.findOne({ discordId: userId });
    
    if (!user) {
      interaction.reply("Error fetching user, please report this to a developer");
      return;
    }

    user.inactivePending = false;
    await user.save();

    interaction.message.edit({
      components: Utils.disableButtons(interaction.message.components, { disableAll: true }),
    });

    interaction
      .guild!.members.fetch(userId)
      .then((member) => {
        const otkRole = Utils.getRole(interaction.guild!, Roles.OPT_TO_KICK_ROLE);
        if (otkRole) member.roles.add(otkRole);
        interaction.reply(`Gave user OTK role. Please make sure to remove their guild member roles and remove them from the guild.`);
      })
      .catch((err) => {
        console.error(err);
        interaction.reply("Error fetching member. Please report this to a developer.");
      });
  },
  validator: (button) => button.customId.toLowerCase().startsWith("acceptotk") && button.inGuild(),
};

export default event;
