import { ButtonInteraction, Collection, Message, PermissionString, SelectMenuInteraction } from "discord.js";
import { IGuildSettings } from "../schemas/GuildSettings";
import Client from "./Client";

// Commands
export type Permission = "DEVELOPER" | "ADMIN" | "STAFF" | PermissionString;

export type CommandType = "COMMAND" | "SUB_COMMAND";
export type RunCallback = (client: Client, message: Message, args: string[], settings?: IGuildSettings | null) => void;

export interface ICommand {
  run: RunCallback;
  description: string;
  usage: string;
  name: string;
  subcommands?: Collection<string, ICommand>;
  defaultSubCommand?: string;
  aliases?: string[];
  guildOnly?: boolean;
  minArgs?: number;
  permissions?: Permission[];
  type: CommandType;
  category: string;
}

export type SubCommandSettings = Omit<ICommand, "run" | "description" | "usage" | "subcommands" | "type" | "name" | "category">;
export type ICommandSettings = Omit<ICommand, "subcommands" | "type" | "name" | "category">;

// Interactions
export interface IButtonInteraction {
  run: (client: Client, interaction: ButtonInteraction) => void;
  validator: (interaction: ButtonInteraction) => boolean;
}
export interface ISelectMenuInteraction {
  run: (client: Client, interaction: SelectMenuInteraction) => void;
  validator: (interaction: SelectMenuInteraction) => boolean;
}