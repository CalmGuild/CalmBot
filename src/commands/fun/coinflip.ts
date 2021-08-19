import { ICommandSettings } from "../../structures/interfaces";
import Utils from "../../util/Utils";

const command: ICommandSettings = {
  run: (client, message, args) => {
    message.reply("🪙 Flipping coin... 🪙").then((msg) => {
      setTimeout(() => {
        msg.edit(`It's ${Utils.randomArray(["Heads", "Tails"])}!`);
      }, 1000);
    });
  },
  description: "Flip a coin",
  usage: "coinflip",
  aliases: ["cf"],
};

export default command;
