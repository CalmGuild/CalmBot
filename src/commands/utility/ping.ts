import { ICommandSettings } from "../../structures/interfaces";

const command: ICommandSettings = {
  run: (client, message, args) => {
    const ts = Date.now();
    message.reply("Pinging...").then((msg) => {
      msg.edit(`Pong! Latency is ${Date.now() - ts}ms. API Latency is ${client.ws.ping}ms`)
    });
  },
  description: "Pong!",
  usage: "ping",
};

export default command;
