import { Collection } from "discord.js";

interface Challenge {
  name: string;
  points: number;
}

export default new Collection<string, Challenge>([
  ["e6", { name: "Drink a strength potion in UHC", points: 1 }],
  ["e7", { name: "Kill 3+ players in skywars", points: 1 }],
  [
    "e8",
    {
      name: "Buy a Diamond sword in the bedwars shop",
      points: 1,
    },
  ],
  ["e9", { name: "Kill a player in Mega Walls", points: 1 }],
  ["e10", { name: "Win a game of guess the build", points: 1 }],
  ["m6", { name: "Obtain an infinity bow in murder mystery", points: 3 }],
  ["m7", { name: "Get 5 different types of wood in a single game of UHC", points: 3 }],
  ["m8", { name: "Kill 6+ players in a game of skywars", points: 3 }],
  ["m9", { name: "Win a game of bedwars after going to bed destruction with a challenge active", points: 3 }],
  ["m10", { name: "Win a game of smash heroes", points: 3 }],
  ["h6", { name: "Get 50+ kills in a game of paintball", points: 5 }],
  ["h7", { name: "Win a game of skywars with the ultimate warrior challenge active", points: 5 }],
  [
    "h8",
    {
      name: "Win a game of Turbo Kart Racers in 4 minutes or less",
      points: 5,
    },
  ],
  ["h9", { name: "Make a notch apple in UHC", points: 5 }],
  ["h10", { name: "Win a game of murder mystery as murderer with 15 kills", points: 5 }],
]);
