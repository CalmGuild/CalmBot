import { GuildMember, Message, MessageEmbed } from "discord.js";
import { IButtonInteraction } from "../../structures/interfaces";
import challenges from "../../util/challenges";
import { Channels, Roles } from "../../util/constants";
import Utils from "../../util/Utils";

const event: IButtonInteraction = {
  run: async (client, interaction) => {
    const monthlyChallengesTeam = Utils.getRole(interaction.guild!, Roles.MONTHLY_CHALLENGES_TEAM);
    if (monthlyChallengesTeam && !(interaction.member as GuildMember)?.roles.cache.has(monthlyChallengesTeam.id)) {
      interaction.reply({ content: `Only those with the ${monthlyChallengesTeam.name} role may do this`, ephemeral: true });
      return;
    }

    const args = interaction.customId.split("_");
    const userId = args[1]!;
    const challengeId = args[2]!;

    const challenge = challenges.get(challengeId);
    if (!challenge) {
      interaction.reply({ content: "This challenge does not exist", ephemeral: true });
      return;
    }

    const user = await Utils.getUser(userId);
    if (user.completedChallenges?.includes(challengeId)) {
      interaction.reply({ content: "This challenge is already marked as complete for this user", ephemeral: true });
      return;
    }

    user.pendingChallenges = user.pendingChallenges?.filter((ele) => ele !== challengeId);
    user.completedChallenges?.push(challengeId);
    await user.save();

    if (interaction.message instanceof Message)
      interaction.message.edit({
        components: Utils.disableButtons(interaction.message.components, { disableAll: true }),
      });

    client.users
      .fetch(userId)
      .then((user) => {
        const embed = new MessageEmbed().setColor("GREEN").setTitle("Challenge Request Accepted").setDescription(`**Challenge Name:** ${challenge.name}\n**Challenge ID:** ${challengeId}`);
        user
          .send({ embeds: [embed] })
          .then(() => {
            interaction.reply("Challenge accepted");
          })
          .catch(() => {
            const channel = Utils.getChannel(interaction.guild!, Channels.CHALLENGE_PROOF);
            if (!channel || !channel.isText()) {
              interaction.reply({ content: "Challenge was accepted but we could not inform the user becuase their DMs are closed and challenge-proof text channel does not exist.", ephemeral: true });
              return;
            }
            channel.send({ content: user.toString(), embeds: [embed] });
            interaction.reply(`Challenge accepted. User informed in ${channel} since their DMs were closed`);
          });
      })
      .catch((err) => {
        console.error(err);
        interaction.reply({ content: "Error: Couldn't fetch discord user", ephemeral: true });
      });
  },
  validator: (interaction) => interaction.customId.toLowerCase().startsWith("acceptchallenge") && interaction.inGuild(),
};

export default event;
