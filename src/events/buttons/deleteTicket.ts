import { GuildMember } from "discord.js";
import { IButtonInteraction } from "../../structures/interfaces";

const event: IButtonInteraction = {
  run: async (client, interaction) => {
    if (!interaction.guild || !(interaction.member instanceof GuildMember)) return;
    const settings = await client.getSettings(interaction.guild.id);
    const user = Array.from(settings.tickets.keys()).find((key) => settings.tickets.get(key) === interaction.channelId);
    if (!user) {
      interaction.reply({ content: "Well this is awkward. This ticket does not exist in the database! Please contact a developer.", ephemeral: true });
      client.logger.warning(`Tried to close ticket ${interaction.channelId} but it wasnt found in the database`);
      return;
    }

    settings.tickets.delete(user);
    await settings.save();
    interaction.channel?.delete();
  },
  validator: (button) => button.customId.toLowerCase().startsWith("deleteticket"),
};

export default event;
