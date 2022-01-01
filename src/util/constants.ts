import { Collection } from "discord.js";

export const Roles = {
  ADMIN: {
    name: "Admin",
    id: "739711920004923412",
  },
  DISCORD_STAFF: {
    name: "Discord Staff",
    id: "769723745640120401",
  },
  GUILD_STAFF: {
    name: "Guild Staff",
    id: "626858736287350784",
  },
  APPLICATIONS_TEAM: {
    name: "Application Team",
    id: "598307890607947787",
  },
  WAITLIST: {
    name: "waitlist",
    id: "593498585581092864",
  },
  INACTIVE: {
    name: "Inactive",
    id: "909593975759982612",
  },
  MONTHLY_CHALLENGES_TEAM: {
    name: "Monthly Challenges Team",
    id: "764901345353400350"
  }
};

export const Channels = {
  SUGGESTIONS: {
    name: "suggestions",
    id: "770049673657843732",
  },
  EMOTE_SUGGESTIONS: {
    name: "emote-suggestions",
    id: "627304676957618195",
  },
  MOVIE_SUGGESTIONS: {
    name: "movie-suggestions",
    id: "713917298674499646",
  },
  GUILD_STAFF_CHAT: {
    name: "guild-staff-chat",
    id: "547923467522015263",
  },
  INACTIVITY: {
    name: "inactivity",
    id: "909306229787074560",
  },
  CHALLENGE_REQUESTS: {
    name: "challenge-requests",
    id: "787202572032278539",
  },
  CHALLENGE_PROOF: {
    name: "challenge-proof",
    id: "694564620303597608"
  }
};

export default {
  EIGHT_BALL_RESPONSES: [
    "It is certain",
    "Processing... I don't care",
    "It is decidedly so",
    "Without a doubt",
    "Yes definitely",
    "Error: 400. Question too stupid",
    "You may rely on it",
    "Im not answering that",
    "As I see it, yes",
    "Most likely",
    "Outlook good",
    "Yes",
    "No",
    "Signs point to yes",
    "Reply hazy try again",
    "Ask again later",
    "Better not tell you now",
    "Cannot predict now",
    "This is a perfect discord bot and I can not waste my time with that question",
    "Concentrate and ask again",
    "Don't count on it",
    "My reply is no",
    "My sources say no",
    "Outlook not so good",
    "what??",
    "Very doubtful",
    "I don't feel like answering that, continue on with your day",
  ],

  // Categories that cant be disabled
  NON_TOGGLEABLE_CATEGORIES: ["admin"],

  // Discord IDs of CalmBot developers
  DEVELOPERS: ["438057670042320896" /* Miqhtie */],

  // Types of suggestions and which channels they go into
  SUGGESTION_CHANNELS: new Collection([
    ["regular", Channels.SUGGESTIONS],
    ["emote", Channels.EMOTE_SUGGESTIONS],
    ["movie", Channels.MOVIE_SUGGESTIONS],
  ]),

  CHANNEL_ALLOW_PERMISSIONS: ["VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "SEND_MESSAGES", "USE_EXTERNAL_EMOJIS", "ATTACH_FILES", "EMBED_LINKS"],

  TICKET_TYPES: new Collection([
    ["support", "Support 🔧"],
    ["report", "Report ⚠️"],
    ["appeal", "Appeal ⛔"],
    ["bug", "Bug Report 🤖"],
    ["redeem", "Redeem 💰"],
  ]),

  INFO_COLOR: "#1f9aff",
  WARNING_COLOR: "#cce63e",
  ERROR_COLOR: "#e83313",

  CALM_GUILD_ID: "5af718d40cf2cbe7a9eeb063",
};
