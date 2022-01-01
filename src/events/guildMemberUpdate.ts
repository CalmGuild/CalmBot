import { GuildMember, MessageEmbed } from "discord.js";
import User from "../schemas/User";
import Client from "../structures/Client";
import { Channels, Roles } from "../util/constants";
import Utils from "../util/Utils";

export default async function guildMemberUpdate(client: Client, oldMember: GuildMember, newMember: GuildMember) {
  const newRoles = newMember.roles.cache.filter((role) => !oldMember.roles.cache.has(role.id));
  const oldRoles = oldMember.roles.cache.filter((role) => !newMember.roles.cache.has(role.id));

  const waitlistRole = Utils.getRole(newMember.guild, Roles.WAITLIST);
  if (!waitlistRole) return;
  const settings = await client.getSettings(newMember.guild.id);
  if (newRoles.size > 0 && newRoles.first()!.id === waitlistRole.id) {
    // waitlist role added
    if (settings.waitlist.find((w) => w.user === newMember.id)) return; // user already in waitlist
    const user = await User.findOne({ discordId: newMember.id });
    if (!user || !user.minecraftUUID) {
      const guildStaffChat = Utils.getChannel(newMember.guild, Channels.GUILD_STAFF_CHAT);
      if (guildStaffChat && guildStaffChat.isText()) guildStaffChat.send(`${newMember} was given the waitlist role but not added to the waitlist due to their account not being linked to discord!`);
      return;
    }

    settings.waitlist.push({ user: newMember.id, isFrozen: false, informed: false, uuid: user.minecraftUUID });

    const channel = newMember.guild.channels.cache.get(settings.waitlistChannel!);
    if (!channel || !channel.isText()) settings.waitlistChannel = undefined;

    newMember.send({ embeds: [new MessageEmbed().setDescription(`Congratulations you have been accepted and are now on the calm waitlist!${channel ? `\n${channel}` : ""}`)] }).catch(() => {});
    await settings.save();

    if (channel && channel.isText()) {
      channel.send(
        `${newMember}\nCongratulations, you’ve made it to our waitlist\nWhile waiting:\n  • Read the pinned message in this channel\n  • Read our rules\n  • Come talk to us in general! <3\n\nIf you have any questions please open a ticket and we would be happy to help\nOnce a spot opens up for you, you will be pinged here!`
      );
    }
  } else if (oldRoles.size > 0 && oldRoles.first()!.id === waitlistRole.id) {
    const waitlistMember = settings.waitlist.find((w) => w.user === newMember.id);
    if (!waitlistMember) return;
    settings.waitlist = settings.waitlist.filter((ele) => ele !== waitlistMember);
    await settings.save();
  }
}
