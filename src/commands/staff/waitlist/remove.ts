import { GuildMember, MessageMentions } from "discord.js";
import getUUIDFromName from "../../../api/mojang";
import { ICommandSettings } from "../../../structures/interfaces";

const command: ICommandSettings = {
  run: async (client, message, args, settings) => {
    let member: GuildMember | void;
    if (new RegExp(MessageMentions.USERS_PATTERN).test(args[0]!)) {
      const id = args[0]!.substring(3, args[0]!.length - 1);
      member = await message.guild!.members.fetch(id).catch(() => {});
    } else member = await message.guild!.members.fetch(args[0]!).catch(() => {});

    let waitlistMember = settings?.waitlist.find((w) => w.user === member?.id);
    if (!waitlistMember) {
      let uuid = await getUUIDFromName(args[0]!).catch(() => {});

      if (uuid) waitlistMember = settings?.waitlist.find((w) => w.uuid === uuid);
      if (!waitlistMember) {
        message.reply("User isn't on waitlist.");
        return;
      }
    }

    settings!.waitlist = settings!.waitlist.filter((w) => w !== waitlistMember);
    await settings?.save();

    message.reply(`User removed from waitlist!`);
  },
  description: "Removes a person from the waitlist!",
  usage: "waitlist remove (userid | @user | minecraft-ign)",
  permissions: ["STAFF"],
  minArgs: 1,
  guildOnly: true,
};

export default command;
