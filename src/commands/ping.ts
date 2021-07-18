import { ICommandSettings } from "../structures/interfaces";

const command: ICommandSettings = {
  run: (client, message, args) => {
    client.reply(message, "Pong!");
  },
  description: "Pong!",
  usage: "ping",
};

export default command;
