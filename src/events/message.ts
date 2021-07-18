import { Message } from "discord.js";
import Client from "../structures/Client";

export default function message(client: Client, message: Message) {
  if (message.author.bot) return;

  if (!message.content.toLowerCase().startsWith(client.prefix)) return;

  const args: string[] = message.content.slice(client.prefix.length).trim().split(/ +/g);
  const commandName = args.shift()!.toLowerCase();

  const command = client.commands.get(commandName) ?? client.commands.find((cmd) => (cmd.aliases ? cmd.aliases.includes(commandName) : false));

  if (command) client.handleCommand(command, message, args);
}
