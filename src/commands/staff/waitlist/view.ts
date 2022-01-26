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
      const name = client.minecraftNames.getName(user.uuid); // all names cached from before
      waitlist += `${i + 1}. ${name}${user.isFrozen ? " | **Frozen**" : user.informed ? " | **Informed**" : ""}`;

      if (i === settings!.waitlist.length - 1) {
        waitlist += "\n\n**Informed**: informed of open guild slot they can join\n**Frozen**: frozen in place for any reason";
        message.reply(waitlist);
      } else waitlist += "\n";
    });
  },
  description: "View the waitlist!",
  usage: "waitlist",
  guildOnly: true,
};

export default command;
