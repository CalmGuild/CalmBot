import { GuildChannel, Message, MessageButton, MessageEmbed } from "discord.js";
import User from "../../schemas/User";
import { IButtonInteraction } from "../../structures/interfaces";
import { Roles } from "../../util/constants";
import Utils from "../../util/Utils";

const event: IButtonInteraction = {
  run: async (client, interaction) => {
    const userId = interaction.customId.split("_")[1]!;
    if (interaction.user.id !== userId) {
      interaction.reply({ ephemeral: true, content: "Only the person who created this application may submit it." });
      return;
    }

    if (!(interaction.channel instanceof GuildChannel)) return;

    await interaction.channel.permissionOverwrites.edit(userId, { VIEW_CHANNEL: false });

    const settings = await client.getSettings(interaction.guild!.id)!;
    settings.applicants.set(userId, { channelId: interaction.channelId!, pendingReview: true });
    await settings.save();

    interaction.user
      .send({
        embeds: [
          {
            description:
              "Your application is now pending review from staff. You will be updated here once staff reach a decision. If staff have questions about an answer they might DM you. Please ask any staff member who has the applications team role if you have any questions. Thanks for your interest in our guild!",
          },
        ],
      })
      .catch(() => {});

    const user = await User.findOne({ discordId: interaction.user.id });

    const applicationTeam = Utils.getRole(interaction.guild!, Roles.APPLICATIONS_TEAM);
    const embed = new MessageEmbed().setTitle("Application Submited").setDescription(`${interaction.user.tag} has submited their application and it is ready for review.\n\nMC UUID: ${user?.minecraftUUID ?? "N/A"}`);

    const acceptButton = new MessageButton().setCustomId(`acceptApplication_${userId}`).setStyle("SUCCESS").setLabel("Accept");
    const denyButton = new MessageButton().setCustomId(`denyApplication_${userId}`).setStyle("DANGER").setLabel("Deny");

    interaction.channel.send({
      content: applicationTeam ? applicationTeam.toString() : undefined,
      embeds: [embed],
      components: [
        {
          type: "ACTION_ROW",
          components: [acceptButton, denyButton],
        },
      ],
      allowedMentions: { parse: ["roles"] },
    });
    interaction.reply({
      ephemeral: true,
      content: `Your application is now pending review from staff. You will be updated here once staff reach a decision. If staff have questions about an answer they might DM you. Please ask any staff member who has the applications team role if you have any questions. Thanks for your interest in our guild!.`,
    });
    if (!(interaction.message instanceof Message)) return;
    interaction.message.edit({
      content: interaction.message.content,
      components: Utils.disableButtons(interaction.message.components, { disableAll: true }),
    });
  },
  validator: (interaction) => interaction.customId.toLowerCase().startsWith("submitapplication") && interaction.guild !== null,
};

export default event;
