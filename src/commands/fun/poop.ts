import { ICommandSettings } from "../../structures/interfaces";
import constants from "../../util/constants";
import Utils from "../../util/Utils";

const command: ICommandSettings = {
  run: (client, message, args) => {
  client.reply("💩")
  },
  description: "Get a poop reply",
  usage: "poop",
  aliases: ["poo"],
  };
  
  export default command;
