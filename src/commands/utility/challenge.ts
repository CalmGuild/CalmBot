import { MessageButton, MessageEmbed } from "discord.js";
import { ICommandSettings } from "../../structures/interfaces";
import challenges from "../../util/challenges";
import { Channels } from "../../util/constants";
import Utils from "../../util/Utils";

const command: ICommandSettings = {
  run: async (client, message, args) => {
    const challengeId = args[0]!.toLowerCase();
    const challenge = challenges.get(challengeId);
    if (!challenge) {
      message.reply("Invalid challenge id");
      return;
    }

    const user = await Utils.getUser(message.author.id);
    if (user.pendingChallenges?.includes(challengeId) || user.completedChallenges?.includes(challengeId)) {
      const pending = user.pendingChallenges?.includes(challengeId);
      message.reply(pending ? "You already submited this challenge and it is pending review" : "You already completed this challenge");
      return;
    }

    if (message.attachments.size === 0 || !message.attachments.first()?.contentType?.startsWith("image")) {
      message.reply("You must attach an image showing proof that you completed the challenge");
      return;
    }

    const attachment = message.attachments.first()!;

    const channel = Utils.getChannel(message.guild!, Channels.CHALLENGE_REQUESTS);
    if (!channel || !channel.isText()) {
      message.reply("Couldn't make a request because challenge-requests text channel does not exist");
      return;
    }

    const embed = new MessageEmbed()
      .setTitle(`Challenge request from ${message.author.tag}`)
      .setDescription(`**Challenge Name:** ${challenge.name}\n**Challenge ID:** ${challengeId}`)
      .setImage(attachment.url)
      .setTimestamp()
      .setColor("#7cf7b1");

    const accept = new MessageButton().setLabel("Accept").setStyle("SUCCESS").setCustomId(`acceptChallenge_${message.author.id}_${challengeId}`);
    const deny = new MessageButton().setLabel("Deny").setStyle("DANGER").setCustomId(`denyChallenge_${message.author.id}_${challengeId}`);

    channel.send({
      embeds: [embed],
      components: [{type: "ACTION_ROW", components: [accept, deny]}]
    }).then(async () => {
      user.pendingChallenges?.push(challengeId);
      await user.save();
      message.reply("Your challenge request is now pending, you will be notified once it is accepted or denied");
    }).catch((err) => {
      console.error(err);
      message.reply("Failed to send channel request, please contact a developer")
    });
  },
  description: "Submit a challenge to be approved",
  usage: "challenge <challenge-id> <proof as attached image>",
  minArgs: 1,
  guildOnly: true,
};

export default command;
