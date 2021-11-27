import { MessageMentions, Role } from "discord.js";
import { ICommandSettings } from "../../../structures/interfaces";

const command: ICommandSettings = {
  run: async (client, message, args, settings) => {
    if (!settings || !message.guild) return;

    let role: Role | undefined;
    if (new RegExp(MessageMentions.ROLES_PATTERN).test(args[0]!)) {
      const id = args[0]!.substring(3, args[0]!.length - 1);
      role = message.guild.roles.cache.get(id);
    } else role = message.guild.roles.cache.get(args[0]!);

    if (!role) {
      client.reply(message, "Couldn't find role!");
      return;
    }

    settings.ticketRoles.push(role.id);
    await settings.save();
    client.reply(message, `${role.name} added!`);
  },
  description: "Adds a role to future tickets!",
  usage: "ticketroles add <roleid or mention role>",
};

export default command;
