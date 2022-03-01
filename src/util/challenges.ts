import { Collection } from "discord.js";

interface Challenge {
  name: string;
  points: number;
}

export default new Collection<string, Challenge>([
  ["e1", { name: "Get 10 kills in one game of bedwars ", points: 1 }],
  ["e2", { name: "Win a game of galaxy wars ", points: 1 }],
  [
    "e3",
    {
      name: "Complete bedwars/skywars lobby parkour in under 90 seconds ",
      points: 1,
    },
  ],
  ["e4", { name: "Get a kill in UHC ", points: 1 }],
  ["e5", { name: "Win a game of dreams bedwars ", points: 1 }],
  ["e6", { name: "Survive to round 15 in pixel party  ", points: 1 }],
  ["e7", { name: "Wear full diamond armor in normal mode skywars ", points: 1 }],
  ["e8", { name: "Win a game of Cops vs Crims ", points: 1 }],
  ["e9", { name: "Get a new year's cake from the baker in Skyblock  ", points: 1 }],
  ["e10", { name: "Win a game of paintball ", points: 1 }],
  ["m1", { name: "Win a game of bounty hunters with 70 points ", points: 3 }],
  ["m2", { name: "", points: 3 }],
  ["m3", { name: "Win a game of farm hunt as the last survivor ", points: 3 }],
  ["m4", { name: "Get 5 kills in pvp run ", points: 3 }],
  ["m5", { name: "Drink holy water in UHC ", points: 3 }],
  ["m6", { name: "Get 20 kills in one CTW game ", points: 3 }],
  [
    "m7",
    {
      name: "Win hide and seek party pooper with 4 or more objectives completed ",
      points: 3,
    },
  ],
  ["m8", { name: "Kill 7 or more players in solo skywars ", points: 3 }],
  ["m9", { name: "Get 50 or more skywars EXP from one game  ", points: 3 }],
  ["m10", { name: "Obtain a diamond sword in blitz ", points: 3 }],
  ["h1", { name: "Win ender spleef with 2,500 blocks broken ", points: 5 }],
  ["h2", { name: "Win a game of teams UHC ", points: 5 }],
  [
    "h3",
    {
      name: "Win a game of teams skywars with 12+ kills by yourself ",
      points: 5,
    },
  ],
  ["h4", { name: "Get 80 points in a single game of bounty hunters ", points: 5 }],
  ["h5", { name: "Kill 600 zombies in one game of zombies ", points: 5 }],
  ["h6", { name: "Win blocking dead with 300+ zombie kills ", points: 5 }],
  ["h7", { name: "Score 7 or more goals in a game of football ", points: 5 }],
  ["h8", { name: "Win a game of walls with 8 kills ", points: 5 }],
  ["h9", { name: "Get 50 kills in a game of paintball ", points: 5 }],
  ["h10", { name: "Get 10 kills in UHC ", points: 5 }],
]);
