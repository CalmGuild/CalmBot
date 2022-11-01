import { Collection } from "discord.js";

interface Challenge {
  name: string;
  points: number;
}

export default new Collection<string, Challenge>([
  ["e1", { name: "Get 5 kills in a game of Warlords", points: 1 }],
  ["e2", { name: "Win a game of Cops Vs. Crims: Defusal", points: 1 }],
  [
    "e3",
    {
      name: "Kill 300 zombies in a game of Zombies",
      points: 1,
    },
  ],
  ["e4", { name: "Get a 10 WS in duels", points: 1 }],
  ["e5", { name: "Get 3 kills in a game of Blitz", points: 1 }],
  ["e6", { name: "Wear full enchanted diamond in normal Skywars", points: 1 }],
  ["e7", { name: "Win a game of Pixel Party", points: 1 }],
  ["e8", { name: "Win a game of Lucky Block Skywars", points: 1 }],
  ["e9", { name: "Get a 5 WS in Bedwars", points: 1 }],
  ["e10", { name: "Win a game of Murder Mystery as dective/hero", points: 1 }],
  ["m1", { name: "Win a game of Skywars with 5+ kills", points: 3 }],
  ["m2", { name: "Kill 15 vampires in a single game of VampireZ", points: 3 }],
  ["m3", { name: "Place top 3 in a game of Turbo Kart Racers", points: 3 }],
  ["m4", { name: "Obtain 2 divine/heavenly heads in a corrupt Skywars game", points: 3 }],
  ["m5", { name: "Win bedwars with the swordless challenge active", points: 3 }],
  ["m6", { name: "Win Ender Spleef with 2k+ blocks broken", points: 3 }],
  [
    "m7",
    {
      name: "Get a 20 ws in Bedwars",
      points: 3,
    },
  ],
  ["m8", { name: "Win Guess the Build with a 5 point lead", points: 3 }],
  ["m9", { name: "Win a game of Warlords as top 3 in healing/damage", points: 3 }],
  ["m10", { name: "Make it to round 35 in Zombies: Alien Arcadium", points: 3 }],
  ["h1", { name: "Win a game of solo Skywars with 7+ kills", points: 5 }],
  ["h2", { name: "Win a game of Cops Vs Crims with most kills", points: 5 }],
  [
    "h3",
    {
      name: "Get 50 kills in a Paintball game",
      points: 5,
    },
  ],
  ["h4", { name: "Get a 50 Duels ws", points: 5 }],
  ["h5", { name: "Win a game of TNT Tag", points: 5 }],
  ["h6", { name: "Kill someone with the Robinhood blitz star in Blitz", points: 5 }],
  ["h7", { name: "Win a game of Blitz without opening a chest", points: 5 }],
  [
    "h8",
    {
      name: "Win H&S Party Pooper by completing all tasks/kill all players respectively",
      points: 5,
    },
  ],
  ["h9", { name: "Win a game of bow Duels with 100% accuracy", points: 5 }],
  ["h10", { name: "Get a legendary vote in Build Battle (teams or solo)", points: 5 }],
]);
