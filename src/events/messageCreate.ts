import { Message } from "discord.js";
import GuildSettings, { IGuildSettings } from "../schemas/GuildSettings";
import Client from "../structures/Client";

export default async function message(client: Client, message: Message) {
  if (message.author.bot) return;

  if (!message.content.toLowerCase().startsWith(client.prefix)) return;

  let settings: IGuildSettings | null = null;
  if (message.guild) {
    settings = await GuildSettings.findOne({guildID: message.guild.id})
    if (settings === null) {
      settings = new GuildSettings({guildID: message.guild.id});
      await settings.save();
    }
  }

  const args: string[] = message.content.slice(client.prefix.length).trim().split(/ +/g);
  const commandName = args.shift()!.toLowerCase();

  const command = client.commands.get(commandName) ?? client.commands.find((cmd) => (cmd.aliases ? cmd.aliases.includes(commandName) : false));

  if (command) client.handleCommand(command, message, args, settings);
}
