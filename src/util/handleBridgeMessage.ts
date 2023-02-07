import { Message, MessageEmbed } from "discord.js";
import { getGuild } from "../api/hypixel";
import { sendCommand } from "../api/minecraftBot";
import Client from "../structures/Client";
import constants from "./constants";
import Utils from "./Utils";

export default async (client: Client, message: Message) => {
  const user = await Utils.getUser(message.author.id);

  let inGuild = false;
  const guild = await getGuild(constants.CALM_GUILD_ID).catch(console.error);
  if (user.minecraftUUID && guild) inGuild = guild.members.find((m) => m.uuid === user.minecraftUUID) !== undefined;

  if (!inGuild) {
    message.reply({ embeds: [new MessageEmbed().setDescription("⚠️ You are not in calm guild").setColor("DARK_RED")] });
    return;
  }

  if (!user.minecraftUUID) return;

  const name = await client.minecraftNames.getName(user.minecraftUUID);

  const characterLimit = 252 - (name.length + 3);

  if (message.content.length > characterLimit) {
    message.reply({ embeds: [new MessageEmbed().setDescription(`⚠️ Message in excess of character limit (reduce message by ${message.content.length - characterLimit})`).setColor("DARK_RED")] });
    return;
  }

  sendCommand(`/gc [${name}] ${message.content}`).catch((err) => {
    console.error(err);
    message.reply({ embeds: [new MessageEmbed().setDescription(`⚠️ Error sending message`).setColor("DARK_RED")] });
  });
};
