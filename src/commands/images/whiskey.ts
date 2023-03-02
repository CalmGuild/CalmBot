import {  ICommandSettings } from "../../structures/interfaces";
import { Whiskey } from "../../util/images";

const command: ICommandSettings = {
  run: (client, message, args) => {
    const img = Whiskey[Math.floor(Math.random() * Whiskey.length)]
    if (!img) {
      message.reply("Failure to get image. Please report this to a developer")
      return;
    }
    message.reply({content: img, allowedMentions: {repliedUser: false}})
  },
  description: "Sends a random picture of whiskey!",
  usage: "whiskey",
};


export default command;
