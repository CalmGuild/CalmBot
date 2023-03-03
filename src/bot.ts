if (process.env.NODE_ENV !== "production") require("dotenv").config();

import { Intents } from "discord.js";
import mongoose from "mongoose";
import Client from "./structures/Client";
import path from "path";

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.DIRECT_MESSAGES],
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
  allowedMentions: { parse: ["users"], repliedUser: true },
});

mongoose.connect(process.env.MONGO_URL!).then(() => {
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
