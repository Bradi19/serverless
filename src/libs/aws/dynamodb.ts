import {DynamoDB} from "aws-sdk";

export const dynamodb = new DynamoDB.DocumentClient();

export const mapBatchWrite = (tableName, items) => ({
	RequestItems: {
		[tableName]: items.map(item => ({
			PutRequest: {
				Item: item
			}
		}))
	}
})