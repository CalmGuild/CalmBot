import { MessageMentions, Role } from "discord.js";
import { ICommandSettings } from "../../../structures/interfaces";

const command: ICommandSettings = {
  run: async (client, message, args, settings) => {
    if (!settings || !message.guild) return;

    let role: Role | undefined;
    if (new RegExp(MessageMentions.ROLES_PATTERN).test(args[0]!!)) {
      const id = args[0]!!.substring(3, args[0]!!.length - 1);
      role = message.guild.roles.cache.get(<`${bigint}`>id);
    } else role = message.guild.roles.cache.get(<`${bigint}`>args[0]);

    if (!role || !settings.ticketRoles.includes(role.id)) {
      client.reply(message, "That role is no included in the ticket role list.");
      return;
    }

    settings.ticketRoles = settings.ticketRoles.filter((ele) => ele !== role!!.id);
    await settings.save();
    client.reply(message, `${role.name} removed!`);
  },
  description: "Removes a role from future tickets!",
  usage: "ticketroles remove <roleid or mention role>",
  aliases: ["delete"],
};

export default command;
