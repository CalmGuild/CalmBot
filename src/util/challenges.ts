import { Collection } from "discord.js";

interface Challenge {
  name: string;
  points: number;
}

export default new Collection<string, Challenge>([
  ["e1", { name: "Win a game of Capture the Wool", points: 1 }],
  ["e2", { name: "Win a game of Cops vs Crims", points: 1 }],
  ["e3", { name: "Win a game of Pixel Party", points: 1 }],
  ["e4", { name: "Win a game of Warlords", points: 1 }],
  ["e5", { name: "Win a game of Ender Spleef", points: 1 }],
  ["e6", { name: "Win a game of Paintball", points: 1 }],
  ["e7", { name: "Win a game of Mega Walls without being finaled", points: 1 }],
  ["e8", { name: "Win a game of Football", points: 1 }],
  ["e9", { name: "Win a game of Wizards", points: 1 }],
  ["e10", { name: "Win a game of Invaders", points: 1 }],
  ["e11", { name: "Get 5 kills in Warlords TDM", points: 1 }],
  ["e12", { name: "Max diamond upgrades in Bedwars", points: 1 }],
  ["e13", { name: "Win a game of Farm Hunt", points: 1 }],
  ["e14", { name: "Win TNT Run with 5+ double jumps left", points: 1 }],
  ["e15", { name: "Win solo Skywars using Sloth kit", points: 1 }],
  ["m1", { name: "Win a game of Speed UHC", points: 3 }],
  ["m2", { name: "Win a game of Ender Spleef with 2k+ blocks broken", points: 3 }],
  ["m3", { name: "Capture 2 wools in CTW", points: 3 }],
  ["m4", { name: "Get 15+ kills in Galaxy Wars", points: 3 }],
  ["m5", { name: "Kill all 3 withers in Mini Walls and then win", points: 3 }],
  ["m6", { name: "Win Vampirez as the last survivor", points: 3 }],
  ["m7", { name: "Win a game of Zombies in under 30 mintues", points: 3 }],
  ["m8", { name: "Win Bedwars with the defused challenge", points: 3 }],
  ["m9", { name: "Win Bedwars with the swordless challenge", points: 3 }],
  ["m10", { name: "Get a 25 ws in any duels mode", points: 3 }],
  ["m11", { name: "Win a game of TKR", points: 3 }],
  ["m12", { name: "Win a game of Dragon Wars", points: 3 }],
  ["m13", { name: "Get top 3 kills in solo Quake", points: 3 }],
  ["m14", { name: "Win a game of Murder Mystery as murderer", points: 3 }],
  ["m15", { name: "Get a 7 kill game in solo Skywars", points: 3 }],
  ["h1", { name: "Obtain 2 divine or heavenly heads in 1 SW Game", points: 5 }],
  ["h2", { name: "Win a game of Blitz without opening any chests", points: 5 }],
  ["h3", { name: "Win Blitz with the rambo kit", points: 5 }],
  ["h4", { name: "Win a UHC game", points: 5 }],
  ["h5", { name: "Kill a dragon in Bedwars", points: 5 }],
  ["h6", { name: "Place top 3 in a major Pit event", points: 5 }],
  ["h7", { name: "Claim a bounty of 1500 or more gold in the Pit", points: 5 }],
  ["h8", { name: "Win Blitz with the florist kit", points: 5 }],
  ["h9", { name: "Win a game of TNT Run without using any double jumps", points: 5 }],
  ["h10", { name: "Get 15 combined kills in teams Skywars", points: 5 }],
  ["h11", { name: "12 human kills as a vamp in Vampirez", points: 5 }],
  ["h12", { name: "Get a 24 star game of Party Games", points: 5 }],
  ["h13", { name: "50 ws in any duels modes (not sumo)", points: 5 }],
  ["h14", { name: "50+ kills in team Quake", points: 5 }],
  ["h15", { name: "Win a game of blocking dead as the last survivor", points: 5 }],
]);
