if (process.env.NODE_ENV !== "production") require("dotenv").config();

import { Intents } from "discord.js";
import mongoose from "mongoose";
import Client from "./structures/Client";
import path from "path";

process.on("unhandledException", console.error);
process.on("unhandledRejection", console.error);

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES],
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
  allowedMentions: { parse: ["users"], repliedUser: true },
});

mongoose
  .connect(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true,
  })
  .then(() => {
    client.logger.info("Connected to database.");

    client.registerCommands(path.join(__dirname, "commands"));
    client.registerEvents(path.join(__dirname, "events"));
    client.login(process.env.BOT_TOKEN);
  });
