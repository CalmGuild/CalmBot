if (process.env.NODE_ENV !== "production") require("dotenv").config();

import { Intents } from "discord.js";
import Client from "./structures/Client";

import path from "path";

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES],
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
  allowedMentions: { parse: ["users"], repliedUser: true },
});

client.registerCommands(path.join(__dirname, "commands"));
client.registerEvents(path.join(__dirname, "events"));

client.login(process.env.BOT_TOKEN);
