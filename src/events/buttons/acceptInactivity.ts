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
    user!.inactive = true;

    interaction.message.edit({
      components: Utils.disableButtons(interaction.message.components, { disableAll: true }),
    });

    await user!.save();
    interaction
      .guild!.members.fetch(userId)
      .then((member) => {
        const inactiveRole = Utils.getRole(interaction.guild!, Roles.INACTIVE);
        if (inactiveRole) member.roles.add(inactiveRole);
        interaction.reply(`${interaction.user} has accepted ${user}'s inactivity request. Please inform them that they have been granted gexp immunity.`);

        client.jobManager.schedule("removeinactive", user!.inactiveExpires!, [
          ["guild", interaction.guildId!],
          ["user", userId],
        ]);
      })
      .catch((err) => {
        console.error(err);
        interaction.reply("Error fetching member. Please report this to a developer.");
      });
  },
  validator: (button) => button.customId.toLowerCase().startsWith("acceptinactivity") && button.inGuild(),
};

export default event;
