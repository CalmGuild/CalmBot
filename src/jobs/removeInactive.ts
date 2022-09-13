import { TextChannel } from "discord.js";
import User from "../schemas/User";
import Client from "../structures/Client";
import { Channels, Roles } from "../util/constants";
import Utils from "../util/Utils";

export default function (data: Map<string, string>, client: Client) {
  const guild = client.guilds.cache.get(data.get("guild")!);
  const userId = data.get("user")!;

  guild?.members
    .fetch(userId)
    .then(async (member) => {
      const inactiveRole = Utils.getRole(guild!, Roles.INACTIVE);
      if (inactiveRole) member.roles.remove(inactiveRole);

      const user = await User.findOne({ discordId: userId });
      user!.inactive = false;
      user!.inactivePending = false;
      user!.inactiveReason = undefined;

      await user?.save();

      const inactivityChannel = Utils.getChannel(guild!, Channels.INACTIVITY);
      if (inactivityChannel && inactivityChannel instanceof TextChannel) inactivityChannel.send(`${member.toString()}'s inactivity has expired!`);
    })
    .catch((err) => {
      console.error(err);
    });
}
