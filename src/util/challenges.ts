import { Collection } from "discord.js";

interface Challenge {
  name: string;
  points: number;
}

export default new Collection<string, Challenge>([
  ["e1", { name: "Win a game of pixel party", points: 1 }],
  ["e2", { name: "Win a game of skywars doubles", points: 1 }],
  [
    "e3",
    {
      name: "Complete a quest in The Pit",
      points: 1,
    },
  ],
  ["e4", { name: "Win a game of parkour duels", points: 1 }],
  ["e5", { name: "Get a kill in UHC", points: 1 }],
  ["e6", { name: "Wear enchanted full Diamond armor in Normal Skywars", points: 1 }],
  ["e7", { name: "Get an infinity bow in Murder Mystery", points: 1 }],
  ["e8", { name: "Get 3+ kills in a game of skywars", points: 1 }],
  ["e9", { name: "Get a kill in PVP run", points: 1 }],
  ["e10", { name: "Win a game of ender spleef", points: 1 }],
  ["m1", { name: "Win a game of solo skywars with 5+ kills", points: 3 }],
  ["m2", { name: "Win a game of bedwars with a challenge activated", points: 3 }],
  ["m3", { name: "Break 3 beds in Teams Bedwars", points: 3 }],
  ["m4", { name: "Win a game of speed UHC", points: 3 }],
  ["m5", { name: "Craft a jukebox in UHC", points: 3 }],
  ["m6", { name: "Win a game of bow spleef", points: 3 }],
  [
    "m7",
    {
      name: "Obtain one of every color of wool in bedwars solo/doubles",
      points: 3,
    },
  ],
  ["m8", { name: "Get 5+ kills in a game of blitz", points: 3 }],
  ["m9", { name: "Win a game of Zombies", points: 3 }],
  ["m10", { name: "Win as the last hider in farm hunt", points: 3 }],
  ["h1", { name: "Acquired an enchant Diamond sword in Blitz SG", points: 5 }],
  ["h2", { name: "Win a game of UHC", points: 5 }],
  [
    "h3",
    {
      name: "Get 8+ kills in a game of solo Skywars",
      points: 5,
    },
  ],
  ["h4", { name: "Break 5+ beds in a game of bedwars", points: 5 }],
  ["h5", { name: "Win a game of Walls with 6+ kills", points: 5 }],
  ["h6", { name: "Get 15+ kills combined in a game of skywars duels", points: 5 }],
  ["h7", { name: "Complete the protect the President bedwars challenge in teams bedwars", points: 5 }],
  [
    "h8",
    {
      name: "Win a game of quakecraft",
      points: 5,
    },
  ],
  ["h9", { name: "Win a game of bow duels with 100% accuracy", points: 5 }],
  ["h10", { name: "Get a legendary build in build battle (large legendary text, Diamond rain) [Solo or Teams]", points: 5 }],
]);
