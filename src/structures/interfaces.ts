import { ButtonInteraction, Collection, ContextMenuInteraction, Message, PermissionString, SelectMenuInteraction } from "discord.js";
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

export interface IContextMenuInteraction {
  run: (client: Client, interaction: ContextMenuInteraction) => void;
  validator: (interaction: ContextMenuInteraction) => boolean;
}
// Prompts
export type PromptCallback = (answers: Collection<string, Message>) => void;
export interface PromptQuestion {
  question: string;
  id: string;
  validation?: {
    validator: (answer: Message) => boolean;
    errorMessage: string;
  };
}

// Hypixel
export interface Player {
  uuid: string;
  playername: string;
  socialMedia?: {
    links: {
      DISCORD?: string;
    };
  };
}

export interface Guild {
  _id: string;
  name: string;
  coins: number;
  coinsEver: number;
  created: number;
  members: { uuid: string; joined: number; expHistory: { [key: string]: number } }[];
  tagColor: string;
  exp: number;
  publiclyListed: boolean;
  description: string;
  tag: string;
}
