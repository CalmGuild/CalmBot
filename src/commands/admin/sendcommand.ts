import { Util } from "discord.js";
import { sendCommand } from "../../api/minecraftBot";
import { ICommandSettings } from "../../structures/interfaces";

const command: ICommandSettings = {
  run: (client, message, args, settings) => {
    const command = args.join(" ");

    sendCommand(command)
      .then((res) => {
        message.reply(`Send command: \`${Util.escapeMarkdown(command)}\``).catch((err) => {});
      })
      .catch((err) => {
        message.reply("Error sending command");
        console.error(err);
      });
  },
  description: "Sends a command from the minecraft bot!",
  usage: "sendcommand <command>",
  permissions: ["DEVELOPER"],
  minArgs: 1,
  guildOnly: true,
};

export default command;
