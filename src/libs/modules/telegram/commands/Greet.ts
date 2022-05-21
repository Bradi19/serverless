import {ICommandHandler} from "./ICommandHandler";
import {TelegramService} from "@libs/services/TelegramService";

const telegramService = new TelegramService();

export class Greet implements ICommandHandler {
    async handle(data) {
        const {chat} = data;

        try {
            await telegramService.sendMessage(chat.id, 'Welcome to "notybotyfy". Press subscribe to start receive important news notifications.');
        } catch (e) {
            console.error(e.message);
        }
    }
}