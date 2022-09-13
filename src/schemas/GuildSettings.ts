import { Collection } from "discord.js";
import { Schema, model, Document } from "mongoose";

interface WaitlistUser {
  user: string;
  uuid: string;
  isFrozen: boolean;
  informed: boolean;
  isOtk: boolean;
}

interface Application {
  channelId: string;
  pendingReview: boolean;
}

export interface IGuildSettings extends Document {
  guildID: string;
  disabledCommands: Array<string>;
  sleep: Boolean;
  tickets: Collection<string, string>;
  ticketRoles: Array<string>;
  ticketCount: number;
  botBlacklist: Array<string>;
  waitlist: Array<WaitlistUser>;
  waitlistChannel?: string;
  applicants: Collection<string, Application>;
}

const GuildSettingsScema = new Schema({
  guildID: { type: String, requried: true, index: true, unique: true },
  disabledCommands: { type: Array<string>(), default: new Array<String>() },
  sleep: { type: Boolean, default: false },
  tickets: { type: Map, default: new Map() },
  ticketRoles: { type: Array<string>(), default: new Array<String>() },
  ticketCount: { type: Number, default: 0 },
  botBlacklist: { type: Array<string>(), default: new Array<String>() },
  waitlist: { type: Array<WaitlistUser>(), default: new Array<WaitlistUser>() },
  waitlistChannel: { type: String },
  applicants: { type: Map, default: new Map() },
});

export default model<IGuildSettings>("GuildSettings", GuildSettingsScema);
