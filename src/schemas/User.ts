import { Snowflake } from "discord-api-types";
import { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
  discordId: Snowflake;
  minecraftUUID?: string;
  inGuild?: boolean;
  inactive?: boolean;
  inactivePending?: boolean;
  inactiveReason?: string;
  inactiveExpires?: number;
}

const UserSchema = new Schema({
  discordId: { type: String, required: true, index: true, unique: true },
  minecraftUUID: { type: String },
  inGuild: { type: Boolean, default: false },
  inactive: { type: Boolean, default: false },
  inactivePending: { type: Boolean, default: false },
  inactiveReason: { type: String },
  inactiveExpires: { type: Number },
});

export default model<IUser>("Users", UserSchema);
