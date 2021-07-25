import { ICommandSettings } from "../../structures/interfaces";
import Constants from "../../util/constants";

const command: ICommandSettings = {
  run: (client, message, args, settings) => {
    const commandName = args[0]!!.toLowerCase();
    const command = client.commands.get(commandName);
    if (!command) {
      client.reply(message, "That is not a valid command!");
      return;
    }

    if (Constants.NON_TOGGLEABLE_CATEGORIES.includes(command.category)) {
      client.reply(message, "This command cant be disabled!");
      return;
    }

    if (settings!!.disabledCommands.includes(commandName)) {
      settings!!.disabledCommands = settings!!.disabledCommands.filter((ele) => ele !== commandName);
      settings?.save().then(() => {
        client.reply(message, "Enabled the command!");
      });
    } else {
      settings?.disabledCommands.push(commandName);
      settings?.save().then(() => {
        client.reply(message, "Disabled the command!");
      });
    }
  },
  description: "Toggle a command!",
  usage: "togglecommand <command>",
  minArgs: 1,
  permissions: ["ADMIN"],
  aliases: ["tcmd"],
  guildOnly: true,
};

export default command;
