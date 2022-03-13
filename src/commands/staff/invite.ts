import { Util } from "discord.js";
import { sendCommand } from "../../api/minecraftBot";
import { ICommandSettings } from "../../structures/interfaces";

const command: ICommandSettings = {
  run: async (client, message, args) => {
    if (!args[0]) return;

    const ign = args[0].toLowerCase();
    sendCommand(`/guild invite ${ign}`)
      .then((res) => {
        message.reply(`Sent command: \`/guild invite ${Util.escapeMarkdown(ign)}\`!`).catch((err) => {});;
      })
      .catch((err) => {
        message.reply("Error sending command");
        console.error(err);
      });
  },
  description: "Invite a minecraft user to the guild ingame!",
  usage: "invite <ign>",
  minArgs: 1,
  guildOnly: true,
  permissions: ["STAFF"],
};

export default command;
