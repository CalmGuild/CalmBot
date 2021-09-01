if (process.env.NODE_ENV !== "production") require("dotenv").config();

import { Intents } from "discord.js";
import mongoose from "mongoose";
import Client from "./structures/Client";
import path from "path";

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES],
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
  allowedMentions: { parse: ["users"], repliedUser: true },
});

mongoose.connect(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`).then(() => {
  client.logger.info("Connected to database.");

  client.registerCommands(path.join(__dirname, "commands"));
  client.registerEvents(path.join(__dirname, "events"));
  client.login(process.env.BOT_TOKEN);
});

process.on("unhandledException", (error) => {
  console.error(error);
  if (client.webhook) {
    client.webhook.sendError(`Unhandled Exception!\n\`\`\`\n${error}\n\`\`\``);
  }
});

process.on("unhandledRejection", (error) => {
  console.error(error);
  if (client.webhook) {
    client.webhook.sendError(`Unhandled Rejection!\n\`\`\`\n${error}\n\`\`\``);
  }
});
