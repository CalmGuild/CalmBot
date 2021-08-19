import { ICommandSettings } from "../../structures/interfaces";

const command: ICommandSettings = {
  run: (client, message, args) => {
    const ts = Date.now();
    message.reply("Pinging...").then((msg) => {
      msg.edit(`Pong! Latency: ${Date.now() - ts}`)
    });
  },
  description: "Pong!",
  usage: "ping",
};

export default command;
