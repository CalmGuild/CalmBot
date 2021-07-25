import { GuildMember } from "discord.js";
import constants from "../util/constants";
import Client from "../structures/Client";
import Utils from "./Utils";

export default class PermissionHandler {
  static isDeveloper(member: GuildMember): Boolean {
    return Client.developers.includes(member.id);
  }

  static isAdmin(member: GuildMember): Boolean {
    if (this.isDeveloper(member)) return true;
    const adminRole = Utils.getRole(member.guild, constants.ROLES.ADMIN);

    if (adminRole && member.roles.cache.has(adminRole.id)) return true;

    return member.permissions.has("ADMINISTRATOR");
  }

  static isStaff(member: GuildMember): Boolean {
    if (this.isAdmin(member)) return true;
    const guildStaff = Utils.getRole(member.guild, constants.ROLES.GUILD_STAFF);
    const discordStaff = Utils.getRole(member.guild, constants.ROLES.DISCORD_STAFF);

    if ((guildStaff && member.roles.cache.has(guildStaff.id)) || (discordStaff && member.roles.cache.has(discordStaff.id))) return true;
    return false;
  }
}
