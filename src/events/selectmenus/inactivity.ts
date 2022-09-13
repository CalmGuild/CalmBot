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

    const lastInactivityExpired = user!.inactiveExpires;
    
    let otk = false;
    let expires = Date.now();
    if (interaction.values[0] === "1w") expires += 1000 * 60 * 60 * 24 * 7;
    else if (interaction.values[0] === "2w") expires += 1000 * 60 * 60 * 24 * 7 * 2;
    else if (interaction.values[0] === "3w") expires += 1000 * 60 * 60 * 24 * 7 * 3;
    else if (interaction.values[0] === "4w") expires += 1000 * 60 * 60 * 24 * 7 * 4;
    else otk = true;

    if (!otk)
    user!.inactiveExpires = expires;
  
    user!.inactivePending = true;
    await user!.save();

    interaction.reply("Your inactivity request is now pending. You will be notified if it is denied.").then(() => {
      interaction.channel?.messages.fetch(interaction.message.id).then((message) => message.delete());
    });

    const inactivityChannel = Utils.getChannel(interaction.guild!, Channels.INACTIVITY);
    if (inactivityChannel && inactivityChannel instanceof TextChannel) {
      const embed = new MessageEmbed()
        .setTitle("New Inactivity Request")
        .setColor("RED")
        .setDescription(`Inactivity Request from ${interaction.user.toString()}\nLast Inactive Expired: ${lastInactivityExpired ? `<t:${Math.floor(lastInactivityExpired / 1000)}:R>` : "N/A"}\n\`\`\`\n${user?.inactiveReason}\`\`\``)
        .addField("Time", otk ? "OTK" : interaction.values[0]!.replace("w", " week(s)"));

      const accept = new MessageButton().setLabel("Accept").setStyle("SUCCESS").setCustomId(`accept${otk ? "OTK" : "Inactivity"}_${userId}`);
      const deny = new MessageButton().setLabel("Deny").setStyle("DANGER").setCustomId(`denyInactivity_${userId}`);

      inactivityChannel.send({ embeds: [embed], components: [{ type: "ACTION_ROW", components: [accept, deny] }] });
    }
  },
  validator: (interaction) => interaction.customId.toLowerCase().startsWith("inactivity") && interaction.inGuild(),
};

export default event;
