import { Snowflake } from "discord.js";
import { Schema, model, Document } from "mongoose";

export interface ISkullMessage extends Document {
  origianlMessageId: Snowflake;
  skullboardMessageId: Snowflake;
}

const SKullMessageSchema = new Schema({
  origianlMessageId: { type: String, required: true, index: true, unique: true },
  skullboardMessageId: { type: String, required: true, unique: true },
});

export default model<ISkullMessage>("SkulledMessages", SKullMessageSchema);
