import { Collection, MessageEmbed } from "discord.js";
import Channels from "../../data/Channels";
import { ISelectMenuInteraction } from "../../structures/interfaces";
import Utils from "../../util/Utils";

const suggestionChannels: Collection<string, { name: string; id: string }> = new Collection([
  ["regular", Channels.SUGGESTIONS],
  ["emote", Channels.EMOTE_SUGGESTIONS],
  ["movie", Channels.MOVIE_SUGGESTIONS],
]);

const event: ISelectMenuInteraction = {
  run: (client, interaction) => {
    if (interaction.customId.split("_")[1] && interaction.user.id !== interaction.customId.split("_")[1]) {
      interaction.reply({ content: "You can not do that!", ephemeral: true });
      return;
    }

    const channelData = suggestionChannels.get(interaction.values[0]!!.toLowerCase());
    if (!channelData) {
      interaction.reply({ content: "Invalid suggestion type.", ephemeral: true });
      return;
    }

    const channel = Utils.getChannel(interaction.guild!!, channelData);    
    
    if (!channel || !channel.isText()) {
      interaction.reply({ content: "Error creating suggestion: Invalid channel.", ephemeral: true });
      return;
    }

    interaction.guild?.members
      .fetch(interaction.user.id)
      .then((member) => {
        const embed = new MessageEmbed().setTitle("Suggestion:").setFooter(member.displayName, member.user.displayAvatarURL()).setTimestamp().setColor("#007FFF");
        if (interaction.message.embeds[0]?.description) embed.setDescription(interaction.message.embeds[0]?.description);
        if (interaction.message.embeds[0]?.image) embed.setImage(interaction.message.embeds[0]?.image.url!!);

        channel.send({ embeds: [embed] }).then((message) => {
          message.react("✅");
          message.react("❎");

          interaction.reply({ content: `Created suggestion ${channel}`, ephemeral: true });
          interaction.channel?.messages
            .fetch(interaction.message.id)
            .then((msg) => msg.delete())
            .catch((err) => client.logger.error(`Error deleting message: ${err}`));
        });
      })
      .catch((err) => {
        client.logger.error(`Error fetching member: ${err}`);
        interaction.reply({ content: "Error: Could not fetch member", ephemeral: true });
      });
  },
  validator: (interaction) => interaction.customId.toLowerCase().startsWith("createsuggestion") && interaction.guild !== null,
};

export default event;
