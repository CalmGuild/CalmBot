import { Schema, model, Document } from "mongoose";

export interface IJob extends Document {
  name: string;
  expirationTimestamp: number;
  data: any;
}

const JobSchema = new Schema({
  name: { required: true, type: String },
  expirationTimestamp: { required: true, type: Number },
  data: { required: true, type: Map },
});

export default model<IJob>("Jobs", JobSchema);
