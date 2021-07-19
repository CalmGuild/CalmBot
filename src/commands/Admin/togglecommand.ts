import { ICommandSettings } from "../../structures/interfaces";

// TODO - Have categories for each command and make it so you can't disable admin/moderation commands instead of this
const cantBeDisabled = ["togglecommand", "sleep"]

const command: ICommandSettings = {
  run: (client, message, args, settings) => {
    const commandName = args[0]!!.toLowerCase();
    if (!client.commands.get(commandName) || cantBeDisabled.includes(commandName)) {
      client.reply(message, "That is not a valid command (or that command can't be disabled)!");
      return;
    }

     if (settings!!.disabledCommands.includes(commandName)) {
       settings!!.disabledCommands = settings!!.disabledCommands.filter(ele => ele !== commandName);
       settings?.save().then(() => {
        client.reply(message, "Enabled the command!");
       })
     } else {
       settings?.disabledCommands.push(commandName);
       settings?.save().then(() => {
        client.reply(message, "Disabled the command!");
       })
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
