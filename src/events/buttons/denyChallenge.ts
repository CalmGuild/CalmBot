import { GuildMember, Message, MessageEmbed } from "discord.js";
import PromptManager from "../../managers/PromptManager";
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
    interaction.deferUpdate();
    new PromptManager(
      client,
      interaction.user,
      interaction.channel!,
      [{ id: "reason", question: "What is the reason", validation: { validator: (message) => message.content.length > 0, errorMessage: "You must include text" } }],
      async (answers) => {
        const reason = answers.get("reason")!;
        user.pendingChallenges = user.pendingChallenges?.filter((ele) => ele !== challengeId);
        user.completedChallenges = user.completedChallenges?.filter((ele) => ele !== challengeId);
        await user.save();

        if (interaction.message instanceof Message) {
          interaction.message.edit({
            components: Utils.disableButtons(interaction.message.components, { disableAll: true }),
          });
        }

        client.users
          .fetch(userId)
          .then((user) => {
            const embed = new MessageEmbed().setColor("RED").setTitle("Challenge Request Denied").setDescription(`**Challenge Name:** ${challenge.name}\n**Challenge ID:** ${challengeId}\n**Reason:** ${reason}`);
            user
              .send({ embeds: [embed] })
              .then(() => {
                interaction.followUp("Challenge denied");
              })
              .catch(() => {
                const channel = Utils.getChannel(interaction.guild!, Channels.CHALLENGE_PROOF);
                if (!channel || !channel.isText()) {
                  interaction.followUp({ content: "Challenge was denied but we could not inform the user becuase their DMs are closed and challenge-proof text channel does not exist.", ephemeral: true });
                  return;
                }
                channel.send({ content: user.toString(), embeds: [embed] });
                interaction.followUp(`Challenge denied. User informed in ${channel} since their DMs were closed`);
              });
          })
          .catch((err) => {
            console.error(err);
            interaction.followUp({ content: "Error: Couldn't fetch discord user", ephemeral: true });
          });
      }
    ).start();
  },
  validator: (interaction) => interaction.customId.toLowerCase().startsWith("denychallenge") && interaction.inGuild(),
};

export default event;
