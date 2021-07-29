import { Collection } from "discord.js";
import { Schema, model, Document } from "mongoose";

export interface IGuildSettings extends Document {
  guildID: string;
  disabledCommands: Array<string>;
  sleep: Boolean;
  tickets: Collection<string, string>;
  ticketRoles: Array<string>;
  ticketCount: number;
}

const GuildSettingsScema = new Schema({
  guildID: { type: String, requried: true, index: true, unique: true },
  disabledCommands: { type: Array<string>(), default: new Array<String>() },
  sleep: { type: Boolean, default: false },
  tickets: { type: Map, default: new Map() },
  ticketRoles: { type: Array<string>(), default: new Array<String>() },
  ticketCount: { type: Number, default: 0 },
});

export default model<IGuildSettings>("GuildSettings", GuildSettingsScema);
