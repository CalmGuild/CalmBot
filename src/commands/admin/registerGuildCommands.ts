import { ContextMenuCommandBuilder } from "@discordjs/builders";
import { ICommandSettings } from "../../structures/interfaces";
import fs from "fs";
import path from "path";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v10";

const command: ICommandSettings = {
  run: async (client) => {
    const dir = path.join(__dirname, "../../events/contextmenus");
    const commands: ContextMenuCommandBuilder[] = [];

    for (const file of fs.readdirSync(dir).filter((file => file.endsWith(".js") || file.endsWith(".ts")))) {
      const data = require(path.join(dir, file)).default.data.toJSON();
      console.log(data);
      
      commands.push(data);
    }

    if (!client.token) {
      console.log("Token not found");
      return
    };

    const rest = new REST({ version: "9" }).setToken(client.token);
    
    try {
      console.log("Started refreshing application (/) commands.");

      await rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID!, process.env.GUILD_ID!), { body: commands });

      console.log("Successfully reloaded application (/) commands.");
    } catch (error) {
      console.error(error);
    }
  },
  description: "tf are you looking at",
  usage: "registerGuildCommands",
  permissions: ["DEVELOPER"],
  guildOnly: true,
};

export default command;
