import { MessageEmbed } from "discord.js";
import { ICommand, ICommandSettings } from "../../structures/interfaces";
import Utils from "../../util/Utils";

const command: ICommandSettings = {
  run: (client, message, args) => {
    const embed = new MessageEmbed().setColor("#069420");
    if (!args[0]) {
      embed.setTitle(`Help | ${client.user?.username}`);
      let categories: string[] = [];
      client.commands.forEach((cmd) => {
        if (!categories.includes(cmd.category)) {
          categories.push(cmd.category);
          const commands = Utils.findAll(client.commands, (v) => v.category === cmd.category)!!
            .map((v) => `${v.name}`)
            .join("\n");
          embed.addField(Utils.normalizeString(cmd.category), `\`\`\`\n${commands}\`\`\``, true);
        }
      });
      embed.setFooter(`Do ${client.prefix}help <command> for help with a command!`);
      client.reply(message, { embeds: [embed] });
      return;
    } else {
      const command = client.commands.get(args[0]) ?? client.commands.find((cmd) => (cmd.aliases ? cmd.aliases.includes(args[0]!!) : false));
      if (!command) {
        client.reply(message, "Invalid command.");
        return;
      }

      embed.setTitle(`Help - ${command.name}`);
      if (command.type === "SUB_COMMAND") {
        const commands = command.subcommands?.map((cmd) => `${cmd.name}${cmd.description !== "N/A" ? ` | ${cmd.description}` : ""}`).join("\n");
        embed.addField(`Subcommands (${command.subcommands?.size})`, `\`\`\`\n${commands}\`\`\``);
        embed.addField("Default Subcommand", command.defaultSubCommand ? `\`${command.defaultSubCommand}\`` : "`none`");
        embed.addFields(getBasicCommandFields(command));
      } else {
        embed.addField("Description", command.description);
        embed.addField("Usage", `\`${command.usage}\``);
        embed.addFields(getBasicCommandFields(command));
        embed.setFooter("<> = Required | [] = Optional");
      }

      client.reply(message, { embeds: [embed] });
    }
  },
  description: "Lists all the commands or provides help with a command!",
  usage: "help [command]",
};

function getBasicCommandFields(command: ICommand): { name: string; value: string; inline?: boolean }[] {
  return [
    {
      name: "Guild Only",
      value: command.guildOnly ? "`true`" : "`false`",
      inline: true,
    },
    {
      name: "Aliases",
      value: command.aliases
        ? command.aliases
            .map((alias) => `\`${alias}\`,`)
            .join(" ")
            .slice(0, -1)
        : "`none`",
      inline: true,
    },
    {
      name: "Required Permissions",
      value: command.permissions
        ? command.permissions
            .map((perm) => `\`${perm}\`,`)
            .join(" ")
            .slice(0, -1)
        : "`none`",
      inline: true,
    },
  ];
}
export default command;
