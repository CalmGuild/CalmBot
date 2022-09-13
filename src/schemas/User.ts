import { Snowflake } from "discord.js";
import { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
  discordId: Snowflake;
  minecraftUUID?: string;
  inactive?: boolean;
  inactivePending?: boolean;
  inactiveReason?: string;
  inactiveExpires?: number;
  completedChallenges?: string[];
  pendingChallenges?: string[];
}

const UserSchema = new Schema({
  discordId: { type: String, required: true, index: true, unique: true },
  minecraftUUID: { type: String },
  inactive: { type: Boolean, default: false },
  inactivePending: { type: Boolean, default: false },
  inactiveReason: { type: String },
  inactiveExpires: { type: Number },
  completedChallenges: { type: Array },
  pendingChallenges: { type: Array },
});

export default model<IUser>("Users", UserSchema);
