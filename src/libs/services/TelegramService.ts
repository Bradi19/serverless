import axios from 'axios';
import createHttpError from "http-errors";
import {CONFIG} from '@config/index';

export class TelegramService {

  private readonly telegramApi: string;

  constructor() {
    this.telegramApi = `https://api.telegram.org/bot${CONFIG.TELEGRAM.TOKEN}`;
  }

  async sendMessage(chatId, message){
    let response;

    try {
      response = await axios.post(this.apiURL(`sendMessage`), {
        chat_id: chatId,
        text: message,
        parse_mode: 'HTML'
      });
    } catch (e) {
      throw new createHttpError.InternalServerError(e);
    }

    return response.data.ok;
  }

  apiURL(uri){
    return `${this.telegramApi}/${uri}`
  }
}