import { IButtonInteraction } from "../../structures/interfaces";

const event: IButtonInteraction = {
  run: async (client, interaction) => {
    const user = interaction.customId.split("_")[1]!!;
    
    const settings = await client.getSettings(interaction.guild!!.id)!!;
    settings.applicants.delete(user);
    interaction.channel?.delete();
    settings.save();
  },
  validator: (interaction) => interaction.customId.toLowerCase().startsWith("exitapplication") && interaction.guild !== null,
};

export default event;