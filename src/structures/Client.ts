import { Client as DiscordClient, ClientOptions, Collection, DMChannel, Message, MessageOptions, MessagePayload, NewsChannel, ReplyMessageOptions, TextChannel, ThreadChannel } from "discord.js";
import logger from "../logger";

import fs from "fs";
import path from "path";
import { ICommand, ICommandSettings, SubCommandSettings } from "./interfaces";
import Utils from "../util/Utils";

export default class Client extends DiscordClient {
  commands = new Collection<string, ICommand>();
  logger = logger;
  prefix = "!";
  static developers = ["438057670042320896" /* Miqhtie */]; // IDs of calmbot developers

  constructor(options: ClientOptions) {
    super(options);
  }

  registerCommands(commandsDir: string) {
    this.commands = walk(commandsDir);

    function walk(dir: string): Collection<string, ICommand> {
      const commands = new Collection<string, ICommand>();
      const files = fs.readdirSync(dir);
      files.forEach((file) => {
        const stats = fs.statSync(path.join(dir, file));
        if (stats.isFile()) {
          const commandName = file.split(".")[0]!!.toLowerCase();
          const command: ICommandSettings = require(path.join(dir, file)).default;

          if (!files.includes(commandName) && commandName !== "subcommandsettings")
            commands.set(commandName, {
              run: command.run,
              aliases: command.aliases,
              defaultSubCommand: command.defaultSubCommand,
              description: command.description,
              guildOnly: command.guildOnly,
              usage: command.usage,
              permissions: command.permissions,
              minArgs: command.minArgs,
              type: "COMMAND",
            });
        } else {
          const subcommands = walk(path.join(dir, file));

          let defaultSubCommand = undefined;
          if (files.includes(file + ".js") || files.includes(file + ".ts")) {
            defaultSubCommand = file;
            subcommands.set(file, require(path.join(dir, file)).default);
          }

          const parentFiles = fs.readdirSync(path.join(dir, file));
          let settings: SubCommandSettings = {};
          if (parentFiles.find((f) => f.toLowerCase().startsWith("subcommandsettings"))) {
            settings = require(path.join(dir, file, "subcommandSettings")).default;
          }

          const command: ICommand = {
            usage: "N/A",
            description: "N/A",
            aliases: settings.aliases,
            defaultSubCommand: settings.defaultSubCommand ? settings.defaultSubCommand : defaultSubCommand,
            guildOnly: settings.guildOnly,
            subcommands: subcommands,
            type: "SUB_COMMAND",
            run: (client, message, args) => {
              client.handleCommand(command, message, args);
            },
          };
          commands.set(file, command);
        }
      });
      return commands;
    }
  }

  handleCommand(command: ICommand, message: Message, args: string[]) {
    let subcommandName: string | undefined;
    if (command.type === "SUB_COMMAND") {
      const newArgs = args.slice(0); // prevent args from being shifted
      const cmd = newArgs.shift()?.toLowerCase()!!;
      if (command.subcommands?.has(cmd) || command.subcommands?.find((subcommand) => (subcommand.aliases ? subcommand.aliases.includes(cmd) : false))) subcommandName = args.shift()?.toLowerCase();
    }

    if (command.guildOnly && !message.guild) {
      this.reply(message, { content: "This command must be ran in a guild!" });
      return;
    }

    if (message.guild) {
      if (command.permissions && !Utils.hasPermissions(message.member!!, command.permissions)) {
        this.reply(message, {
          content: `You are missing the following permission(s) to run this command\n${command.permissions
            .map((perm) => `\`${perm}\`,`)
            .join(" ")
            .slice(0, -1)}`,
        });
        return;
      }
    }

    if (command.minArgs && args.length < command.minArgs) {
      this.reply(message, { content: `Too little arguments provided!${command.type === "COMMAND" ? `\nUsage: \`${command.usage}\`` : ""}` });
      return;
    }

    if (command.type === "SUB_COMMAND") {
      let subcommand: ICommand | undefined;
      if (subcommandName) {
        subcommand = command.subcommands?.get(subcommandName) ?? command.subcommands?.find((cmd) => (cmd.aliases ? cmd.aliases.includes(subcommandName!!) : false));
      } else if (command.defaultSubCommand) {
        subcommand = command.subcommands?.get(command.defaultSubCommand);
      }

      if (subcommand) {
        this.handleCommand(subcommand, message, args);
      } else {
        this.reply(message, { content: `Invalid arugments!` });
      }
    } else {
      command.run(this, message, args);
    }
  }

  registerEvents(eventsDir: string) {
    const files = fs.readdirSync(eventsDir).filter((file) => !fs.statSync(path.join(eventsDir, file)).isDirectory());
    files.forEach((file) => {
      const eventName = file.split(".")[0]!!.toLowerCase();

      const event: () => void = require(path.join(eventsDir, file)).default;

      this.on(eventName, event.bind(null, this));
    });
  }

  send(channel: TextChannel | DMChannel | NewsChannel | ThreadChannel, options: string | MessagePayload | MessageOptions, onSend: (message: Message) => void) {
    channel
      .send(options)
      .then((msg) => onSend(msg))
      .catch((err) => this.logger.error(err));
  }

  reply(message: Message, options: string | MessagePayload | ReplyMessageOptions, onSend?: (message: Message) => void) {
    message
      .reply(options)
      .then((msg) => {
        if (onSend) onSend(msg);
      })
      .catch((err) => this.logger.error(err));
  }
}
