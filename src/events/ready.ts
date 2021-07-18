import Client from "../structures/Client";

export default function ready(client: Client) {
  client.logger.info(`${client.user?.tag} serving ${client.guilds.cache.size} guilds!`);
}
