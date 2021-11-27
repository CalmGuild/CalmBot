import { GuildMember, MessageMentions } from "discord.js";
import { ICommandSettings } from "../../../structures/interfaces";

const command: ICommandSettings = {
  run: async (client, message, args, settings) => {
    let member: GuildMember | void;
    if (new RegExp(MessageMentions.USERS_PATTERN).test(args[0]!)) {
      const id = args[0]!.substring(3, args[0]!.length - 1);
      member = await message.guild!.members.fetch(id).catch(() => {});
    } else member = await message.guild!.members.fetch(args[0]!).catch(() => {});

    if (!member) {
      message.reply("Invalid Member");
      return;
    }

    const waitlistMember = settings?.waitlist.find((w) => w.user === member!.id);
    if (!waitlistMember) {
      message.reply("User isn't on waitlist.");
      return;
    }

    settings!.waitlist = settings!.waitlist.map((w) => {
      if (w.user === member!.id) return { uuid: w.uuid, user: w.user, isFrozen: false, informed: !waitlistMember.informed };
      return w;
    });
    await settings?.save();

    message.reply(`User ${waitlistMember.informed === false ? "informed" : "uninformed"}!`);
  },
  description: "Marks a user as informed!",
  usage: "waitlist inform (user)",
  permissions: ["STAFF"],
  minArgs: 1,
  guildOnly: true,
};

export default command;
