import { Collection } from "discord.js";

interface Challenge {
  name: string;
  points: number;
}

export default new Collection<string, Challenge>([
  ["e1", { name: "Win a game of Warlords", points: 1 }],
  ["e2", { name: "Get 40 kills in Bedwars", points: 1 }],
  [
    "e3",
    {
      name: "Win a game of Walls",
      points: 1,
    },
  ],
  ["e4", { name: "Get a trophy in TKR", points: 1 }],
  ["e5", { name: "Infect 5 players in 1 MM game (infection)", points: 1 }],
  ["e6", { name: "Win a game of MM as murderer", points: 1 }],
  ["e7", { name: "Get a final in Mega Walls", points: 1 }],
  ["e8", { name: "Win bridge 5-0", points: 1 }],
  ["e9", { name: "Win a game of party games with 18+ stars", points: 1 }],
  ["e10", { name: "Win SW with the UHC challenge enabled", points: 1 }],
  ["m1", { name: "Get 100 kills in 1 game of Paintball", points: 3 }],
  ["m2", { name: "Get 12 kills combined in blitz teams", points: 3 }],
  ["m3", { name: "Win Warlords as MVP", points: 3 }],
  ["m4", { name: "Win quake with a 10 kill lead", points: 3 }],
  ["m5", { name: "Get a 20 ws in Bedwars", points: 3 }],
  ["m6", { name: "Win a game of TNT tag", points: 3 }],
  [
    "m7",
    {
      name: "Get 5 finals in a game of solo Bedwars",
      points: 3,
    },
  ],
  ["m8", { name: "Win CVC TDM with 350+ points", points: 3 }],
  ["m9", { name: "Win TNT wizards with 15+ kills", points: 3 }],
  ["m10", { name: "Win teams quake with 35 kills", points: 3 }],
  ["h1", { name: "Get a 75 ws in Duels", points: 5 }],
  ["h2", { name: "Get an 8 kill game in solo Skywars", points: 5 }],
  [
    "h3",
    {
      name: "Win a UHC (solo or teams)",
      points: 5,
    },
  ],
  ["h4", { name: "Kill 10 humans as a vampire in VZ", points: 5 }],
  ["h5", { name: "Get an enchanted diamond sword in blitz", points: 5 }],
]);
