import { TextBasedChannels, User, Collection, Message, MessageSelectMenu, MessageButton, SelectMenuInteraction } from "discord.js";
import Client from "../structures/Client";
import { PromptCallback, PromptQuestion } from "../structures/interfaces";

export default class PromptManager {
  static prompts: { instance: PromptManager; user: User; channel: TextBasedChannels }[] = [];

  private client: Client;
  private user: User;
  private channel: TextBasedChannels;
  private questions: PromptQuestion[];
  private callback: PromptCallback;

  private redo = false;
  private currentIndex = -1;
  private answers = new Collection<string, Message>();

  constructor(client: Client, user: User, channel: TextBasedChannels, questions: PromptQuestion[], whenFinished: PromptCallback) {
    this.client = client;
    this.user = user;
    this.channel = channel;
    this.questions = questions;
    this.callback = whenFinished;
  }

  start() {
    if (this.questions.length === 0 || PromptManager.prompts.find((prompt) => prompt.channel.id === this.channel.id && prompt.user.id === this.user.id)) return;
    PromptManager.prompts.push({ instance: this, channel: this.channel, user: this.user });
    this.currentIndex = 0;
    this.client.send(this.channel, {
      content: this.user.toString(),
      embeds: [
        {
          title: "You are now in a prompt",
          description:
            "Please answer the following question(s) by typing in an answer and sending it in this channel\n\nYou can exit at any time by pressing the exit button below\n**Note: When you are finished with all the questions there will be a way to edit a response to a question**",
          color: "#32c5fa",
        },
      ],
      components: [
        {
          type: "ACTION_ROW",
          components: [{ type: "BUTTON", customId: `exitPrompt_${this.channel.id}_${this.user.id}`, label: "Exit", style: "DANGER" }],
        },
      ],
    });
    this.askQuestion(this.questions[0]!!);
  }

  handleResponse(message: Message) {
    const question = this.questions[this.currentIndex]!!;
    if (question.validation && !question.validation.validator(message)) {
      this.askQuestion(question, `**Error:** ${question.validation.errorMessage}`);
      return;
    }

    this.answers.set(question.id, message);
    if (this.currentIndex === this.questions.length - 1 || this.redo) {
      this.redo = false;
      this.currentIndex = this.questions.length - 1;
      const selectMenu = new MessageSelectMenu().setCustomId(`redoPromptQuestion_${this.channel.id}_${this.user.id}`).setPlaceholder("Select question to redo");
      for (let i = 0; i < this.questions.length; i++) {
        selectMenu.addOptions({ label: `Question ${i + 1}`, value: i.toString() });
      }
      const confirmButton = new MessageButton().setCustomId(`confirmPrompt_${this.channel.id}_${this.user.id}`).setLabel("Confirm").setStyle("SUCCESS");
      const cancelButton = new MessageButton().setCustomId(`exitPrompt_${this.channel.id}_${this.user.id}`).setLabel("Cancel").setStyle("DANGER");
      this.channel.send({
        content: this.user.toString(),
        embeds: [{ title: "Confrimation", description: "Please either click the confirm button or select a question that you wish to redo" }],
        components: [
          { type: "ACTION_ROW", components: [selectMenu] },
          { type: "ACTION_ROW", components: [confirmButton, cancelButton] },
        ],
      });
      return;
    }

    this.currentIndex++;
    this.askQuestion(this.questions[this.currentIndex]!!);
  }

  handleRedo(questionIndex: number, interaction: SelectMenuInteraction) {
    this.redo = true;
    this.currentIndex = questionIndex;
    const question = this.questions[questionIndex]!!;
    interaction.reply({
      content: "Please retype the answer to this question",
      embeds: [{ author: { name: this.user.username, iconURL: this.user.avatarURL() ?? undefined }, description: `**#${questionIndex + 1}:** ${question.question}`, color: "#32c5fa" }],
    });
  }

  confirm() {
    this.callback(this.answers);
    this.exit();
  }

  exit() {
    PromptManager.prompts = PromptManager.prompts.filter((prompt) => prompt.instance !== this);
  }

  isRedoing() {
    return this.redo;
  }

  private askQuestion(question: PromptQuestion, additionalMessage?: string) {
    this.client.send(this.channel, {
      content: additionalMessage ? `${additionalMessage}\n` : undefined,
      embeds: [{ author: { name: this.user.username, iconURL: this.user.avatarURL() ?? undefined }, description: `**#${this.currentIndex + 1}:** ${question.question}`, color: "#32c5fa" }],
    });
  }
}
