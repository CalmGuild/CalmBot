import { Client as DiscordClient, ClientOptions, Collection, Message, MessageOptions, MessagePayload, ReplyMessageOptions, TextBasedChannels } from "discord.js";
import logger from "../logger";

import fs from "fs";
import path from "path";
import { IButtonInteraction, ICommand, ICommandSettings, ISelectMenuInteraction, SubCommandSettings } from "./interfaces";
import Utils from "../util/Utils";
import GuildSettings, { IGuildSettings } from "../schemas/GuildSettings";
import PermissionHandler from "../util/PermissionHandler";
import PrivateWebhookManager from "../util/PrivateWebhookManager";
import JobManager from "../util/JobManager";
import MinecraftNameManager from "../util/MinecraftNameManager";

export default class Client extends DiscordClient {
  commands = new Collection<string, ICommand>();
  logger = logger;
  prefix = "c!";
  timeInitialized: number;
  buttonInteractions: Collection<string, IButtonInteraction> | undefined;
  selectMenuInteractions: Collection<string, ISelectMenuInteraction> | undefined;
  webhook: PrivateWebhookManager | undefined;
  jobManager: JobManager;
  minecraftNames: MinecraftNameManager;

  constructor(options: ClientOptions) {
    super(options);
    this.timeInitialized = Date.now();
    this.minecraftNames = new MinecraftNameManager();
    this.jobManager = new JobManager(this, path.join(__dirname, "../jobs"));
    if (process.env.WEBHOOK_ID && process.env.WEBHOOK_TOKEN) {
      this.webhook = new PrivateWebhookManager(this, { id: process.env.WEBHOOK_ID, token: process.env.WEBHOOK_TOKEN });
    }
  }

  registerCommands(commandsDir: string) {
    let cmds = new Collection<string, ICommand>();
    fs.readdirSync(commandsDir).forEach((file) => {
      const category = file.toLowerCase();
      cmds = new Collection([...cmds, ...walk(path.join(commandsDir, category), category)]);
    });
    this.commands = cmds;

    function walk(dir: string, category: string): Collection<string, ICommand> {
      const commands = new Collection<string, ICommand>();
      const files = fs.readdirSync(dir);
      files.forEach((file) => {
        const stats = fs.statSync(path.join(dir, file));
        if (stats.isFile()) {
          const commandName = file.split(".")[0]!.toLowerCase();
          const command: ICommandSettings = require(path.join(dir, file)).default;

          if (!files.includes(commandName) && commandName !== "subcommandsettings")
            commands.set(commandName, {
              run: command.run,
              name: commandName,
              aliases: command.aliases,
              defaultSubCommand: command.defaultSubCommand,
              description: command.description,
              guildOnly: command.guildOnly,
              usage: command.usage,
              permissions: command.permissions,
              minArgs: command.minArgs,
              type: "COMMAND",
              category: category,
            });
        } else {
          const subcommands = walk(path.join(dir, file), category);

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
            name: file,
            usage: "N/A",
            description: "N/A",
            aliases: settings.aliases,
            defaultSubCommand: settings.defaultSubCommand ? settings.defaultSubCommand : defaultSubCommand,
            guildOnly: settings.guildOnly,
            subcommands: subcommands,
            category: category,
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

  handleCommand(command: ICommand, message: Message, args: string[], settings?: IGuildSettings | null) {
    let subcommandName: string | undefined;
    if (command.type === "SUB_COMMAND") {
      const newArgs = args.slice(0); // prevent args from being shifted
      const cmd = newArgs.shift()?.toLowerCase()!;
      if (command.subcommands?.has(cmd) || command.subcommands?.find((subcommand) => (subcommand.aliases ? subcommand.aliases.includes(cmd) : false))) subcommandName = args.shift()?.toLowerCase();
    }

    if (command.guildOnly && !message.guild) {
      this.reply(message, { content: "This command must be ran in a guild!" });
      return;
    }

    if (message.guild) {
      if (settings!.botBlacklist.includes(message.author.id)) {
        this.reply(message, "You are blacklisted from using this bot!");
        return;
      }

      if (settings!.sleep && !PermissionHandler.isAdmin(message.member!)) {
        this.reply(message, "This bot is on sleep mode!");
        return;
      }

      if (settings!.disabledCommands.includes(command.name) && !PermissionHandler.isAdmin(message.member!)) {
        this.reply(message, "This command is disabled!");
        return;
      }

      if (command.permissions && !Utils.hasPermissions(message.member!, command.permissions)) {
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
        subcommand = command.subcommands?.get(subcommandName) ?? command.subcommands?.find((cmd) => (cmd.aliases ? cmd.aliases.includes(subcommandName!) : false));
      } else if (command.defaultSubCommand) {
        subcommand = command.subcommands?.get(command.defaultSubCommand);
      }

      if (subcommand) {
        this.handleCommand(subcommand, message, args, settings);
      } else {
        this.reply(message, { content: `Invalid arugments!` });
      }
    } else {
      command.run(this, message, args, settings);
    }
  }

  registerEvents(eventsDir: string) {
    const files = fs.readdirSync(eventsDir);
    files.forEach((file) => {
      const stats = fs.statSync(path.join(eventsDir, file));
      if (!stats.isDirectory()) {
        const eventName = file.split(".")[0]!;

        const event: () => void = require(path.join(eventsDir, file)).default;

        this.on(eventName, event.bind(null, this));
      } else if (file === "buttons") this.buttonInteractions = this.registerInteractions(path.join(eventsDir, file)) as Collection<string, IButtonInteraction>;
      else if (file === "selectmenus") this.selectMenuInteractions = this.registerInteractions(path.join(eventsDir, file)) as Collection<string, ISelectMenuInteraction>;
    });
  }

  send(channel: TextBasedChannels, options: string | MessagePayload | MessageOptions, onSend?: (message: Message) => void) {
    channel
      .send(options)
      .then((msg) => {
        if (onSend) onSend(msg);
      })
      .catch((err) => this.logger.error(`Error sending a message: ${err}`));
  }

  reply(message: Message, options: string | MessagePayload | ReplyMessageOptions, onSend?: (message: Message) => void) {
    message
      .reply(options)
      .then((msg) => {
        if (onSend) onSend(msg);
      })
      .catch((err) => this.logger.error(`Error replying to message: ${err}`));
  }

  getSettings(guildID: string): Promise<IGuildSettings> {
    return new Promise(async (resolve) => {
      let settings = await GuildSettings.findOne({ guildID: guildID });
      if (settings === null) {
        settings = new GuildSettings({ guildID: guildID });
        await settings.save();
      }
      resolve(settings);
    });
  }

  private registerInteractions(dir: string): Collection<string, IButtonInteraction | ISelectMenuInteraction> {
    let interactions = new Collection<string, IButtonInteraction | ISelectMenuInteraction>();
    fs.readdirSync(dir)
      .filter((file) => !fs.statSync(path.join(dir, file)).isDirectory())
      .forEach((file) => {
        const name = file.split(".")[0]!;
        const event: IButtonInteraction | ISelectMenuInteraction = require(path.join(dir, file)).default;

        interactions.set(name, event);
      });
    return interactions;
  }
}
