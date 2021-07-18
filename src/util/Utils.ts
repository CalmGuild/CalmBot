import { Guild, GuildMember, Role } from "discord.js";
import { Permission } from "../structures/interfaces";
import PermissionHandler from "./PermissionHandler";

export default class Utils {
  static getRole(guild: Guild, role: { name: string; id: string }): Role | undefined {
    return guild.roles.cache.get(<`${bigint}`>role.id) ?? guild.roles.cache.find((r) => r.name === role.name);
  }

  static hasPermissions(member: GuildMember, permissions: Permission[]) {
    return !permissions.some((permission) => {
      switch (permission) {
        case "DEVELOPER":
          return !PermissionHandler.isDeveloper(member);
        case "ADMIN":
          return !PermissionHandler.isAdmin(member);
        case "STAFF":
          return !PermissionHandler.isStaff(member);
        default:
          if (PermissionHandler.isAdmin(member)) return false;
          return !member.permissions.has(permission);
      }
    });
  }
}
