import {  ICommandSettings } from "../../structures/interfaces";
import { Arlo } from "../../util/images";

const command: ICommandSettings = {
  run: (client, message, args) => {
    const img = Arlo[Math.floor(Math.random() * Arlo.length)]
    if (!img) {
      message.reply("Failure to get image. Please report this to a developer")
      return;
    }
    message.reply({content: img, allowedMentions: {repliedUser: false}})
  },
  description: "Sends a random picture of arlo!",
  usage: "arlo",
};


export default command;
