import { Collection, Message, PermissionString } from "discord.js";
import Client from "./Client";

export type Permission = "DEVELOPER" | "ADMIN" | "STAFF" | PermissionString;

export type CommandType = "COMMAND" | "SUB_COMMAND";
export type RunCallback = (client: Client, message: Message, args: string[]) => void;

export interface ICommand {
  run: RunCallback;
  description: string;
  usage: string;
  subcommands?: Collection<string, ICommand>;
  defaultSubCommand?: string;
  aliases?: string[];
  guildOnly?: boolean;
  minArgs?: number;
  permissions?: Permission[];
  type: CommandType;
}

export type SubCommandSettings = Omit<ICommand, "run" | "description" | "usage" | "subcommands" | "type">;
export type ICommandSettings = Omit<ICommand, "subcommands" | "type">;
