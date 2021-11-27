import { ICommandSettings } from "../../structures/interfaces";

const command: ICommandSettings = {
  run: (client, message, args, settings) => {
    settings!.sleep = !settings!.sleep;
    settings!.save().then((newSettings) => {
      client.reply(message, `Sleep mode set to \`${newSettings.sleep ? "on" : "off"}\`.`);
    });
  },
  description: "Toggles sleep mode!",
  usage: "sleep",
  permissions: ["ADMIN"],
  guildOnly: true,
};

export default command;
