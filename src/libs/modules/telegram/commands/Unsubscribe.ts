import {ICommandHandler} from "./ICommandHandler";
import {TelegramService} from "@libs/services/TelegramService";

const telegramService = new TelegramService();

export class Unsubscribe implements ICommandHandler {
  async handle(data) {
    const { chat } = data;

    try {
      await telegramService.sendMessage(chat.id, 'Unsubscribe command hasn\'t been implemented yet.')
    } catch (e) {
      console.error(e.message);
    }
  }
}