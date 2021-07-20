import { ICommandSettings } from "../../structures/interfaces";
import Utils from "../../util/Utils";
const responses = [
  "It is certain",
  "Processing... I don't care",
  "It is decidedly so",
  "Without a doubt",
  "Yes definitely",
  "Error: 400. Question too stupid",
  "You may rely on it",
  "Im not answering that",
  "As I see it, yes",
  "Most likely",
  "Outlook good",
  "Yes",
  "No",
  "Signs point to yes",
  "Reply hazy try again",
  "Ask again later",
  "Better not tell you now",
  "Cannot predict now",
  "This is a perfect discord bot and I can not waste my time with that question",
  "Concentrate and ask again",
  "Don't count on it",
  "My reply is no",
  "My sources say no",
  "Outlook not so good",
  "what??",
  "Very doubtful",
  "I don't feel like answering that, continue on with your day",
];

const command: ICommandSettings = {
  run: (client, message, args) => {
    client.reply(message, {embeds: [{
      color: "#007FFF",
      title: `🎱 ${Utils.randomArray(responses)}`
    }]})
  },
  description: "Ask the magic 8ball a question",
  usage: "8ball <question>",
  minArgs: 1
}

export default command;