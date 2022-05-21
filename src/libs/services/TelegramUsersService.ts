import {v4 as uuid} from 'uuid';
import {dynamodb} from "@libs/aws/dynamodb";
import {CONFIG} from '@config/index';

export class TelegramUsersService {
  private readonly tableName: string;

  constructor() {
    this.tableName = CONFIG.TABLES.TELEGRAM_USERS;
  }

  async addNewUser(chatId: number) {
    const Item = {
      id: uuid(),
      chatId,
      isActive: 0,
      createdAt: (new Date()).toISOString()
    }

    return await dynamodb.put({
      TableName: this.tableName,
      Item
    }).promise();
  }

  async getUserBy(chatId: number) {
    const params = {
      TableName: this.tableName,
      FilterExpression: '#chatId = :chatId',
      ExpressionAttributeNames: {
        '#chatId': 'chatId',
      },
      ExpressionAttributeValues: {
        ':chatId': chatId,
      },
    };

    const response = await dynamodb
      .scan(params)
      .promise();

    return response.Items[0];
  }

  async getAllActiveUsers(){
    let activeUsers = [];

    const params = {
      TableName: this.tableName,
      FilterExpression: '#isActive = :isActive',
      ExpressionAttributeNames: {
        '#isActive': 'isActive',
      },
      ExpressionAttributeValues: {
        ':isActive': 1,
      },
    }

    try {
      const response = await dynamodb
        .scan(params)
        .promise();

      activeUsers = response.Items;
    } catch (e) {
      console.error(e.message);
    }

    return activeUsers;
  }
}

