import { ICommandSettings } from "../../structures/interfaces";
import constants from "../../util/constants";
import Utils from "../../util/Utils";

const command: ICommandSettings = {
  run: (client, message, args) => {
    client.reply(message, {
      embeds: [
        {
          color: "#007FFF",
          title: `🎱 ${Utils.randomArray(constants.EIGHT_BALL_RESPONSES)}`,
        },
      ],
    });
  },
  description: "Ask the magic 8ball a question",
  usage: "8ball <question>",
  minArgs: 1,
};

export default command;
