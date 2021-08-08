import { MessageSelectMenu } from "discord.js";
import { ICommandSettings } from "../../structures/interfaces";

const command: ICommandSettings = {
  run: (client, message, args, settings) => {
    const menu = new MessageSelectMenu()
      .setCustomId("createTicket")
      .setMaxValues(1)
      .setPlaceholder("Select ticket type")
      .addOptions([
        { label: "Support", description: "Support not listed in any other option", value: "support", emoji: "🔧" },
        { label: "Report", description: "Report a user anonymously for rule breaking", value: "report", emoji: "⚠️" },
        { label: "Appeal", description: "Appeal a warn or mute from staff", value: "appeal", emoji: "⛔" },
        { label: "Bug Report", description: "Report a bug with calmbot", value: "bug", emoji: "🤖" },
        { label: "Redeem", description: "Redeem a tatsu reward", value: "redeem", emoji: "💰" },
      ]);
    
    client.send(message.channel, {
      content: "Welcome to the calm ticket system.\nPlease use the menu below to create a __**private**__ ticket with only staff.\n\n**Note: If you are opening an appeal ticket feel free to use the appeal forum provided in the info channel instead!**",
      components: [{ type: "ACTION_ROW", components: [menu] }],
    });
  },
  description: "Creates the ticket menu!",
  usage: "createticketmenu",
  permissions: ["ADMIN"],
  guildOnly: true,
};

export default command;
