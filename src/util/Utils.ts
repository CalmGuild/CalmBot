import { Channel, Collection, Guild, GuildMember, MessageActionRow, MessageButton, Role } from "discord.js";
import { Permission } from "../structures/interfaces";
import PermissionHandler from "./PermissionHandler";

export default class Utils {
  static getRole(guild: Guild, role: { name: string; id: string }): Role | undefined {
    return guild.roles.cache.get(<`${bigint}`>role.id) ?? guild.roles.cache.find((r) => r.name === role.name);
  }

  static getChannel(guild: Guild, channel: { name: string; id: string }): Channel | undefined {
    return guild.channels.cache.get(<`${bigint}`>channel.id) ?? guild.channels.cache.find((c) => c.name === channel.name);
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

  static normalizeString(str: string): string {
    let newStr = "";

    for (let i = 0; i < str.length; i++) {
      let char = str.charAt(i);

      if (i === 0) {
        newStr += char.toUpperCase();
      } else if (str.charAt(i - 1) === " ") {
        newStr += char.toUpperCase();
      } else {
        newStr += char.toLowerCase();
      }
    }
    return newStr;
  }

  static findAll<K, V>(collection: Collection<K, V>, fn: (value: V) => boolean): V[] | undefined {
    let matches: V[] = [];
    collection.forEach((v) => {
      if (fn(v)) matches.push(v);
    });
    if (matches.length === 0) return undefined;
    return matches;
  }

  static randomArray<T>(array: T[]): T | undefined {
    return array[Math.floor(Math.random() * array.length + 0)];
  }

  static disableButtons(components: MessageActionRow[], toDisable: { buttonIds?: string[]; disableAll?: boolean }): MessageActionRow[] {
    const newComponents: MessageActionRow[] = [];
    components.forEach((row) => {
      const newRow = new MessageActionRow();
      row.components.forEach((component) => {
        if (component instanceof MessageButton && ((toDisable.buttonIds && toDisable.buttonIds.includes(component.customId!!)) || toDisable.disableAll)) {
          const newButton = component;
          newButton.setDisabled(true);
          newRow.addComponents(newButton);
        } else newRow.addComponents(component);
      });
      newComponents.push(newRow);
    });
    return newComponents;
  }
}
