import { CategoryChannel, GuildMember, MessageButton, MessageEmbed, OverwriteResolvable, PermissionString } from "discord.js";
import { ISelectMenuInteraction } from "../../structures/interfaces";
import constants from "../../util/constants";

let nextTicketID = -1; // if two people create the ticket at the exact same time database doesnt update intime (yes this was actually an issue)

const event: ISelectMenuInteraction = {
  run: async (client, interaction) => {
    if (!interaction.guild || !(interaction.member instanceof GuildMember)) return;

    const settings = await client.getSettings(interaction.guild.id);

    const existingTicket = settings.tickets.get(interaction.user.id);
    if (existingTicket) {
      interaction.reply({ content: `You already have a ticket <#${existingTicket}>`, ephemeral: true });
      return;
    }

    const type = constants.TICKET_TYPES.get(interaction.values[0]!);
    if (!type) {
      interaction.reply({ content: `Error: Invalid ticket type`, ephemeral: true });
      return;
    }

    const ticketCategory = interaction.guild.channels.cache.find((channel) => channel.name.toLowerCase() === "tickets" && channel.type === "GUILD_CATEGORY");

    // dumb stuff encase two people make the ticket at the exact same time
    if (nextTicketID === -1) {
      nextTicketID = settings.ticketCount + 1;
    } else nextTicketID++;
    settings.ticketCount = settings.ticketCount + 1;

    let overwrites: OverwriteResolvable[] = [
      { deny: "VIEW_CHANNEL", id: interaction.guild.roles.everyone.id },
      { allow: <PermissionString[]>constants.CHANNEL_ALLOW_PERMISSIONS, id: interaction.member.id },
    ];

    settings.ticketRoles = settings.ticketRoles.filter((role) => interaction.guild?.roles.cache.has(role));
    await settings.save();

    settings.ticketRoles.forEach((roleid) => {
      const role = interaction.guild!.roles.cache.get(roleid);
      if (role) overwrites.push({ allow: <PermissionString[]>constants.CHANNEL_ALLOW_PERMISSIONS, id: role });
    });

    interaction.guild.channels.create(`ticket-${nextTicketID}`, { permissionOverwrites: overwrites, parent: ticketCategory as CategoryChannel }).then(async (channel) => {
      settings.tickets.set(interaction.user.id, channel.id);
      await settings.save();
      const embed = new MessageEmbed()
        .setColor("RED")
        .setDescription(`Ticket No. ${channel.name.split("-")[1]} created by ${interaction.user}`)
        .addField("Ticket Type", type);

      const button = new MessageButton().setStyle("DANGER").setLabel("Delete Ticket").setCustomId("deleteTicket");

      channel
        .send({ embeds: [embed], components: [{ type: "ACTION_ROW", components: [button] }] })
        .then((msg) => msg.pin())
        .catch((e) => client.logger.error(`Error sending ticket message ${e}`));
      interaction.reply({ content: `Ticket Created! ${channel}`, ephemeral: true });
    });
  },
  validator: (interaction) => interaction.customId.toLowerCase().startsWith("createticket"),
};

export default event;
