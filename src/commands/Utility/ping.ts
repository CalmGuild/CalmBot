import { ICommandSettings } from "../../structures/interfaces";

const command: ICommandSettings = {
  run: (client, message, args) => {
    client.reply(message, `Pong! Latency: ${Date.now() - message.createdTimestamp}ms.`);
  },
  description: "Pong!",
  usage: "ping",
};

export default command;
