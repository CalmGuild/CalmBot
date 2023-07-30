import { Collection } from "discord.js";

interface Challenge {
  name: string;
  points: number;
}

export default new Collection<string, Challenge>([
  ["e1", { name: "Obtain a fire aspect sword in UHC", points: 1 }],
  ["e2", { name: "Have a full hotbar of potions in insane skywars", points: 1 }],
  [
    "e3",
    {
      name: "Eat a golden apple in Blitz SG",
      points: 1,
    },
  ],
  ["e4", { name: "Win a game of parkour duels", points: 1 }],
  ["e5", { name: "Go to sudden death in a game of bedwars", points: 1 }],
  ["m1", { name: "Break 3 beds in a game of bedwars", points: 3 }],
  ["m2", { name: "Craft an extra ultimate in UHC", points: 3 }],
  ["m3", { name: "Win a game of build battle", points: 3 }],
  ["m4", { name: "Kill 50 vampires in one game of VampireZ", points: 3 }],
  ["m5", { name: "Obtain a Sharpness IV/V Diamond sword in Skywars", points: 3 }],
  ["h1", { name: "Get a 7+ kill game in solo skywars", points: 5 }],
  ["h2", { name: "Win a game of bedwars with the toxic rain challenge active", points: 5 }],
  [
    "h3",
    {
      name: "Win a game of Quakecraft",
      points: 5,
    },
  ],
  ["h4", { name: "Get 6 kills in a game of Walls", points: 5 }],
  ["h5", { name: "Eat a notch apple in UHC", points: 5 }],
]);
