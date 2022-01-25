import { Collection, MessageEmbed } from "discord.js";
import User, { IUser } from "../../../schemas/User";
import challengs from "../../../util/challenges";
import { ICommandSettings } from "../../../structures/interfaces";

const command: ICommandSettings = {
  run: async (client, message, args) => {
    let users = await User.find();
    users = users.filter((user) => user.completedChallenges && user.completedChallenges?.length > 0);

    const scores = new Collection<IUser, number>();
    for (const user of users) {
      let score = 0;
      for (const completedChallenge of user.completedChallenges!) {
        const challenge = challengs.get(completedChallenge);
        if (challenge) score += challenge.points;
      }
      scores.set(user, score);
    }
    
    let leaderboard = new Collection([...scores.entries()].sort((a, b) => b[1] - a[1]));
    leaderboard = new Collection(Array.from(leaderboard).slice(0, 10));

    const embed = new MessageEmbed().setTitle("Leaderboard").setColor("#0099ff");
    let desc = "", i = 0;

    for (const [user, score] of leaderboard) {
      i++;
      desc += `${i}. <@${user.discordId}> - ${score}\n`;
      if (i === 10) console.log(`${user} - ${score}`)
    }
    embed.setDescription(desc);

    message.reply({embeds: [embed]});
  },
  description: "Show this month's challenge leaderboard",
  usage: "challenge leaderboard",
  permissions: ["STAFF"]
};

export default command;
