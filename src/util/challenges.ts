import { Collection } from "discord.js";

interface Challenge {
  name: string;
  points: number;
}

export default new Collection<string, Challenge>([
  [
    "e1",
    {
      name: "Win a game of corrupted Skywars",
      points: 1,
    },
  ],
  [
    "e2",
    {
      name: "Place top 5 on a drag in SB",
      points: 1,
    },
  ],
  [
    "e3",
    {
      name: "Win a solo q of 4s bw",
      points: 1,
    },
  ],
  [
    "e4",
    {
      name: "Win a game of Warlords",
      points: 1,
    },
  ],
  [
    "e5",
    {
      name: "Get first in Build Battle",
      points: 1,
    },
  ],
  [
    "e6",
    {
      name: "Defuse a bomb in cvc",
      points: 1,
    },
  ],
  [
    "e7",
    {
      name: "Get gtop top 10 in your guild",
      points: 1,
    },
  ],
  [
    "e8",
    {
      name: "Get silver in any sb farming contest",
      points: 1,
    },
  ],
  [
    "e9",
    {
      name: "Beat hopez in a duel",
      points: 1,
    },
  ],
  [
    "e10",
    {
      name: "Add a friend on hypizel",
      points: 1,
    },
  ],
  [
    "m1",
    {
      name: "Get 6 kills and win in solo SW",
      points: 3,
    },
  ],
  [
    "m2",
    {
      name: "Get 1k points in TDM cvc",
      points: 3,
    },
  ],
  [
    "m3",
    {
      name: "Teamwipe a team in 4s bw",
      points: 3,
    },
  ],
  [
    "m4",
    {
      name: "Win creeper attack",
      points: 3,
    },
  ],
  [
    "m5",
    {
      name: "Take a screenie with a YT or Admin",
      points: 3,
    },
  ],
  [
    "m6",
    {
      name: "Win a solo quakecraft game",
      points: 3,
    },
  ],
  [
    "m7",
    {
      name: "Win a game of party games with 24 stars",
      points: 3,
    },
  ],
  [
    "m8",
    {
      name: "Get a 50 ws in any duel mode",
      points: 3,
    },
  ],
  [
    "m9",
    {
      name: "Kill the same player 5 times in a row (solo bw)",
      points: 3,
    },
  ],
  [
    "m10",
    {
      name: "5-0 your opponent in solo bridge",
      points: 3,
    },
  ],
  [
    "h1",
    {
      name: "Place top heal/dmg in Warlords",
      points: 5,
    },
  ],
  [
    "h2",
    {
      name: "Win solo sw with every challenge",
      points: 5,
    },
  ],
  [
    "h3",
    {
      name: "Win a game of UHC",
      points: 5,
    },
  ],
  [
    "h4",
    {
      name: "Get a 8 or 9 kill solo sw win",
      points: 5,
    },
  ],
  [
    "h5",
    {
      name: "Get a 50 ws in bedwars",
      points: 5,
    },
  ],
  [
    "h6",
    {
      name: "Kill every survivor in vampirez",
      points: 5,
    },
  ],
  [
    "h7",
    {
      name: "Get 250k+ gexp in 1 day",
      points: 5,
    },
  ],
  [
    "h8",
    {
      name: "Add hopez on Hypixel",
      points: 5,
    },
  ],
  [
    "h9",
    {
      name: "Get a legendary rain in Build Battle",
      points: 5,
    },
  ],
  [
    "h10",
    {
      name: "Get a stack and a half of ems in 1 bw game",
      points: 5,
    },
  ],
]);