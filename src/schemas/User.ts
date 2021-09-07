import { Snowflake } from "discord-api-types";
import { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
  discordId: Snowflake;
  minecraftUUID?: string;
}

const UserSchema = new Schema({
  discordId: { type: String, required: true, index: true, unique: true },
  minecraftUUID: { type: String },
});

export default model<IUser>("Users", UserSchema);
