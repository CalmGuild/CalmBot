import { HexColorString, MessageEmbed, WebhookClient, WebhookClientData, WebhookClientOptions } from "discord.js";
import Client from "../structures/Client";
import constants from "../util/constants";

export default class PrivateWebhookManager extends WebhookClient {
  private discordClient: Client;

  constructor(client: Client, data: WebhookClientData, options?: WebhookClientOptions) {
    super(data, options);
    this.discordClient = client;
  }

  sendInfo(message: string) {
    const embed = new MessageEmbed()
      .setColor(<HexColorString>constants.INFO_COLOR)
      .setTitle("Info Message")
      .setDescription(message)
      .setTimestamp();
    this.sendMessage([embed]);
  }

  sendWarning(message: string) {
    const embed = new MessageEmbed()
      .setColor(<HexColorString>constants.WARNING_COLOR)
      .setTitle("Warning Message")
      .setDescription(message)
      .setTimestamp();
    this.sendMessage([embed]);
  }

  sendError(message: string) {
    const embed = new MessageEmbed()
      .setColor(<HexColorString>constants.ERROR_COLOR)
      .setTitle("Error Message")
      .setDescription(message)
      .setTimestamp();
    this.sendMessage([embed]);
  }

  private sendMessage(embeds: MessageEmbed[]) {
    this.send({ username: this.discordClient.user?.username, avatarURL: this.discordClient.user?.avatarURL() ?? undefined, embeds: embeds }).catch((error) => {
      this.discordClient.logger.error(`Error sending error embed... this is awkward.\n${error}`);
    });
  }
}
