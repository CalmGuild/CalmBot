import { SubCommandSettings } from "../../../structures/interfaces";

const settings: SubCommandSettings = {
  minArgs: 1,
  guildOnly: true,
  permissions: ["ADMIN"],
  aliases: ["bbl"],
  defaultSubCommand: "add"
};

export default settings;
