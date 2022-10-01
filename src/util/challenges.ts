import { Collection } from "discord.js";

interface Challenge {
  name: string;
  points: number;
}

export default new Collection<string, Challenge>([
  ["e1", { name: "Reach round 15 in Pixel Party", points: 1 }],
  ["e2", { name: "Win a game of Ender Spleef", points: 1 }],
  [
    "e3",
    {
      name: "Get 4+ kills in a game of Skywars",
      points: 1,
    },
  ],
  ["e4", { name: "Get 2+ finals in a game of Bedwars", points: 1 }],
  ["e5", { name: "Win a game of Bow Spleef", points: 1 }],
  ["e6", { name: "Complete a quest in The Pit", points: 1 }],
  ["e7", { name: "Capture the flag in Warlords", points: 1 }],
  ["e8", { name: "Capture a wool in Capture the Wool", points: 1 }],
  ["e9", { name: "Win a game of Vampirez", points: 1 }],
  ["e10", { name: "Win a game of Parkour Duels", points: 1 }],
  ["m1", { name: "Win a game of Quakecraft", points: 3 }],
  ["m2", { name: "Get 6+ kills in a game of Skywars", points: 3 }],
  ["m3", { name: "Win a game of Murder Mystery as Murderer", points: 3 }],
  ["m4", { name: "Infect 5+ players in one game of MM Infection", points: 3 }],
  ["m5", { name: "Win a game of Parkour Duels in less than 4 minutes", points: 3 }],
  ["m6", { name: "Win a game of Cops vs Crims gun game", points: 3 }],
  [
    "m7",
    {
      name: "GGet 6 finals in a game of Bedwars",
      points: 3,
    },
  ],
  ["m8", { name: "Win a game of TNT Run after 8 minutes or more", points: 3 }],
  ["m9", { name: "Craft/aquire a jukebox in UHC champions", points: 3 }],
  ["m10", { name: "Get 4+ kills in Speed UHC", points: 3 }],
  ["h1", { name: "Acquire an enchanted diamond sword in Blitz SG", points: 5 }],
  ["h2", { name: "Win paintball with 50+ kills", points: 5 }],
  [
    "h3",
    {
      name: "Win a game of Zombies: Bad Blood in less than 30 minutes",
      points: 5,
    },
  ],
  ["h4", { name: "Break 4 beds in a game of Bedwars", points: 5 }],
  ["h5", { name: "Get 10+ kills combined in a game of Blitz", points: 5 }],
  ["h6", { name: "Win Galaxy Wars with 30 kills or more", points: 5 }],
  ["h7", { name: "Win a game of Parkour Duels in less than 3 minutes", points: 5 }],
  [
    "h8",
    {
      name: "Win as the last hider in Farm Hunt",
      points: 5,
    },
  ],
  ["h9", { name: "Win a game of Walls with 6+ kills", points: 5 }],
  ["h10", { name: "Win a game of PVP Run without using a double jump", points: 5 }],
]);
