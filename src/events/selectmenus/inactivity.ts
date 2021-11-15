import { MessageButton, MessageEmbed, TextChannel } from "discord.js";
import User from "../../schemas/User";
import { ISelectMenuInteraction } from "../../structures/interfaces";
import { Channels } from "../../util/constants";
import Utils from "../../util/Utils";

const event: ISelectMenuInteraction = {
  run: async (client, interaction) => {
    const userId = interaction.customId.split("_")[1]!;
    if (interaction.user.id !== userId) {
      interaction.reply({ ephemeral: true, content: "Only the person who created this inactivity request may submit it." });
      return;
    }

    const user = await User.findOne({ discordId: userId });

    let expires = Date.now();
    if (interaction.values[0] === "1w") expires += 1000 * 60 * 60 * 24 * 7;
    else if (interaction.values[0] === "2w") expires += 1000 * 60 * 60 * 24 * 7 * 2;
    else if (interaction.values[0] === "3w") expires += 1000 * 60 * 60 * 24 * 7 * 3;
    else expires += 1000 * 60 * 60 * 24 * 7 * 4;

    user!.inactiveExpires = expires;
    user!.inactivePending = true;
    await user!.save();

    interaction.reply("Your inactivity request is now pending. You will be notified of the result by staff when it is done.").then(() => {
      interaction.channel?.messages.fetch(interaction.message.id).then((message) => message.delete());
    });

    const inactivityChannel = Utils.getChannel(interaction.guild!, Channels.INACTIVITY);
    if (inactivityChannel && inactivityChannel instanceof TextChannel) {
      const embed = new MessageEmbed()
        .setTitle("New Inactivity Request")
        .setColor("RED")
        .setDescription(`Inactivity Request from ${interaction.user.toString()}\n\`\`\`\n${user?.inactiveReason}\`\`\``)
        .addField("Time", interaction.values[0]!.replace("w", " week(s)"));

      const accept = new MessageButton().setLabel("Accept").setStyle("SUCCESS").setCustomId(`acceptInactivity_${userId}`);
      const deny = new MessageButton().setLabel("Deny").setStyle("DANGER").setCustomId(`denyInactivity_${userId}`);

      inactivityChannel.send({ embeds: [embed], components: [{ type: "ACTION_ROW", components: [accept, deny] }] });
    }
  },
  validator: (interaction) => interaction.customId.toLowerCase().startsWith("inactivity") && interaction.inGuild(),
};

export default event;
