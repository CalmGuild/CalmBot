import { IButtonInteraction } from "../../structures/interfaces";
import { Roles } from "../../util/constants";
import Utils from "../../util/Utils";

const event: IButtonInteraction = {
  run: async (client, interaction) => {
    const userId = interaction.customId.split("_")[1]!!;
    const settings = await client.getSettings(interaction.guild!!.id)!!;

    const application = settings.applicants.get(userId);
    if (!application) {
      interaction.reply({ content: "Couldn't find application. You should contact a developer.", ephemeral: true });
      return;
    }

    interaction.guild?.members
      .fetch(userId)
      .then((member) => {
        const role = Utils.getRole(interaction.guild!!, Roles.WAITLIST);
        if (!role) {
          interaction.reply("Couldn't find waitlist role.");
          return;
        }
        member.roles.add(role); // waitlist system triggered on waitlist role add will take over from here so no need to inform user that they were accepted
        interaction.channel?.delete();
      })
      .catch(() => {
        interaction.reply("Couldn't find member. Are they still in this server?");
        return;
      });
  },
  validator: (interaction) => interaction.customId.toLowerCase().startsWith("acceptapplication") && interaction.guild !== null,
};

export default event;
