import { GuildMember, MessageEmbed, MessageMentions } from "discord.js";
import { ICommandSettings } from "../../../structures/interfaces";
import challenges from "../../../util/challenges";
import { Roles } from "../../../util/constants";
import Utils from "../../../util/Utils";

const command: ICommandSettings = {
  run: async (client, message, args) => {
    let userId: string | undefined = undefined;

    const role = Utils.getRole(message.guild!, Roles.MONTHLY_CHALLENGES_TEAM);
    if (role && message.member?.roles.cache.has(role.id) && args[0]) {     
      let member: GuildMember | void;
      if (new RegExp(MessageMentions.USERS_PATTERN).test(args[0]!)) {
        const id = args[0]!.substring(3, args[0]!.length - 1);
        member = await message.guild!.members.fetch(id).catch(() => {});
      } else member = await message.guild!.members.fetch(args[0]!).catch(() => {});
      
      if (member) userId = member.id;
    }

    userId ??= message.author.id;
    
    const user = await Utils.getUser(userId);
    if (user.completedChallenges?.length === 0) {
      message.reply("You have not completed any challenges");
      return;
    }

    let currentPoints = 0;
    user.completedChallenges?.forEach((id) => {
      const challenge = challenges.get(id);
      if (challenge) currentPoints += challenge.points;
    });

    let incompleteChallenges: string[] = [];
    let incompleteChallengesPoints = 0;

    for (const [id, challenge] of challenges) {
      if (!user.completedChallenges?.includes(id)) {
        incompleteChallenges.push(id);
        incompleteChallengesPoints += challenge.points;
      }
    }

    const embed = new MessageEmbed()
      .setTitle("Challenge Status")
      .setDescription("Easy: 1pt\nMedium: 3pts\nHard: 5pts")
      .addField(
        `Completed Challenges IDs (${currentPoints} points):`,
        user
          .completedChallenges!.map((c) => `\`${c}\`,`)
          .join(" ")
          .slice(0, -1)
      )
      .addField(
        `Incomplete Challenges IDs (${incompleteChallengesPoints} points):`,
        incompleteChallenges.length !== 0
          ? incompleteChallenges
              .map((c) => `\`${c}\`,`)
              .join(" ")
              .slice(0, -1)
          : "You have completed every challenge!"
      );
    message.reply({ embeds: [embed] });
  },
  description: "Check your currently completed challenges",
  usage: "challenge check",
};

export default command;
