import { sendCommand } from "../../api/minecraftBot";
import { ICommandSettings } from "../../structures/interfaces";

const command: ICommandSettings = {
  run: async (client, message, args) => {
    if (!args[0] || !args[1]) return;

    const ign = args[0].toLowerCase();
    const reason = args.slice(1).join(" ");

    const command = `/g kick ${ign} ${reason}`;
    if (command.length > 256) {
      message.reply("Command in excess of maximum character limit (256). Please shorten the reason.");
      return;
    }

    sendCommand(command)
      .then((res) => {
        message.reply(`Sent command: \`${command}\`!`).catch((err) => {});
      })
      .catch((err) => {
        message.reply("Error sending command");
        console.error(err);
      });
  },
  description: "Kick a minecraft user from the guild ingame!",
  usage: "kick <ign> <reason>",
  minArgs: 2,
  guildOnly: true,
  permissions: ["STAFF"],
};

export default command;
