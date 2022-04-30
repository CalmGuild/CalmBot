import { ICommandSettings } from "../../../structures/interfaces";

const command: ICommandSettings = {
  run: async (client, message, args, settings) => {
    if (settings?.waitlist.length === 0) {
      message.reply("No one is currently on the waitlist!");
      return;
    }
    let waitlist = "**Current Waitlist**\n*This is the order in who gets to join first*\n\n";

    let promises = [];
    for (const user of settings!.waitlist) {
      promises.push(client.minecraftNames.getName(user.uuid));
    }
    await Promise.all(promises); // don't need to loop through resolved promises because once it is requested it will be cached

    settings!.waitlist.forEach(async (user, i) => {
      const name = await client.minecraftNames.getName(user.uuid); // all names cached from before

      const flags = [];
      if (user.informed) flags.push("Informed");
      if (user.isFrozen) flags.push("Frozen");
      if (user.isOtk) flags.push("OTK");

      let formattedFlags = "";
      if (flags.length === 1 && flags[0]) {
        formattedFlags = ` | **${flags[0]}**`
      }

      else if (flags.length > 1) {
        formattedFlags = ` | ${flags.map((flag) => `**${flag},** `).join("").slice(0, -4)}**`
      }

      waitlist += `${i + 1}. ${name}${formattedFlags}`;

      if (i === settings!.waitlist.length - 1) {
        waitlist += "\n\n**Informed**: Informed of open guild slot they can join\n**Frozen**: Frozen in place for any reason\n**OTK**: Previous member of the guild that willing got kicked so they could join back at the top of the waitlist later";
        message.reply(waitlist);
      } else waitlist += "\n";
    });
  },
  description: "View the waitlist!",
  usage: "waitlist",
  guildOnly: true,
};

export default command;
