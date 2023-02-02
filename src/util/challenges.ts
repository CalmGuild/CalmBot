import { Collection } from "discord.js";

interface Challenge {
  name: string;
  points: number;
}

export default new Collection<string, Challenge>([
  ["e1", { name: "Obtain a Power IV bow in normal mode skywars", points: 1 }],
  ["e2", { name: "Obtain a blitz star in blitz SG", points: 1 }],
  [
    "e3",
    {
      name: "Win a game of bedwars",
      points: 1,
    },
  ],
  ["e4", { name: "Win a game of Mega Walls Duels", points: 1 }],
  ["e5", { name: "Get 20 points in a game of Hypixel Says", points: 1 }],
  ["e6", { name: "Get 40 points in a game of Bounty Hunters", points: 1 }],
  ["e7", { name: "Win a game of Parkour duels in under 4 minutes", points: 1 }],
  ["e8", { name: "Get 3 kills in a game of Skywars", points: 1 }],
  ["e9", { name: "Get 2 kills in a game of Speed UHC", points: 1 }],
  ["e10", { name: "Have 30 emeralds at the same time in a game of Bedwars", points: 1 }],
  ["m1", { name: "Win a game of Speed UHC", points: 3 }],
  ["m2", { name: "Win a game of Skywars with 5 or more kills", points: 3 }],
  ["m3", { name: "Get 4 or more kills in a game of Blitz SG", points: 3 }],
  ["m4", { name: "Win a game of Zombies (any map)", points: 3 }],
  ["m5", { name: "Obtain an infinity bow in murder mystery", points: 3 }],
  ["m6", { name: "Win a game of paintball", points: 3 }],
  [
    "m7",
    {
      name: "Get top 3 in a game of TKR",
      points: 3,
    },
  ],
  ["m8", { name: "Get 10 or more kills in a game of quake", points: 3 }],
  ["m9", { name: "Win a game of pixel party", points: 3 }],
  ["m10", { name: "Score 3 goals in a game of football", points: 3 }],
  ["h1", { name: "Win a game of Speed UHC with 5 or more kills", points: 5 }],
  ["h2", { name: "Win a game of Zombies in under 30 minutes", points: 5 }],
  [
    "h3",
    {
      name: "Win a game of skywars with 7 or more kills",
      points: 5,
    },
  ],
  ["h4", { name: "Get a 30 duels win streak", points: 5 }],
  ["h5", { name: "Get a 30 bedwars win streak", points: 5 }],
  ["h6", { name: "Win a game of parkour duels in less than 3 minutes", points: 5 }],
  ["h7", { name: "Get legendary rain in a game of build battle", points: 5 }],
  [
    "h8",
    {
      name: "Get a 50 kill streak in the pit",
      points: 5,
    },
  ],
  ["h9", { name: "Obtain a sharpness V sword in skywars", points: 5 }],
  ["h10", { name: "Win a game of UHC", points: 5 }],
]);
