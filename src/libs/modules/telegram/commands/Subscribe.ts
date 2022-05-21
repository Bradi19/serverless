import {ICommandHandler} from "./ICommandHandler";
import {TelegramUsersService} from "@libs/services/TelegramUsersService";
import {TelegramService} from "@libs/services/TelegramService";
import createHttpError from "http-errors";

const telegramUsersService = new TelegramUsersService();
const telegramService = new TelegramService();

export class Subscribe implements ICommandHandler {

    async handle(data) {
        const {chat} = data;

        const isUserAlreadySubscribed = await telegramUsersService.getUserBy(chat.id);

        if (isUserAlreadySubscribed) {
            return await telegramService.sendMessage(chat.id, 'Trying to subscribe one more time?');
        }

        try {
            await telegramUsersService.addNewUser(chat.id);
        } catch (e) {
            throw new createHttpError.InternalServerError(e);
        }

        return await telegramService.sendMessage(chat.id, 'Subscribed! Now you will receive notifications.');
    }
}