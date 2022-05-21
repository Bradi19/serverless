import type {AWS} from '@serverless/typescript';

import {bot} from '@functions/index';

const serverlessConfiguration: AWS = {
    service: 'telegram-bot',
    frameworkVersion: '3',
    plugins: ['serverless-esbuild', 'serverless-dotenv-plugin'],

    provider: {
        name: 'aws',
        runtime: 'nodejs14.x',
        stage: "${opt:stage, 'prod'}",
        region: "eu-west-1",
        apiGateway: {
            minimumCompressionSize: 1024,
            shouldStartNameWithService: true,
        },
        environment: {
            AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
            NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',

            TELEGRAM_USERS_TABLE_NAME: "${self:custom.telegramUsersTable.name}",
            TELEGRAM_TOKEN: process.env.TELEGRAM_TOKEN,
        },
    },
    // import the function via paths
    functions: {bot},
    resources: {
        Resources: {
            // TODO isolate resources in separate file
            TelegramUsersTable: {
                Type: 'AWS::DynamoDB::Table',
                Properties: {
                    TableName: "TelegramUsersTable-${self:provider.stage}",
                    BillingMode: "PAY_PER_REQUEST",
                    AttributeDefinitions: [
                        { AttributeName: 'id', AttributeType: 'S' }
                    ],
                    KeySchema: [
                        { AttributeName: 'id', KeyType: 'HASH' }
                    ],
                },
            }
        },
    },
    package: {individually: true},
    custom: {
        esbuild: {
            bundle: true,
            minify: false,
            sourcemap: true,
            exclude: ['aws-sdk'],
            target: 'node14',
            define: {'require.resolve': undefined},
            platform: 'node',
            concurrency: 10,
        },
        telegramUsersTable: {
            name: {Ref: ["TelegramUsersTable"]},
            arn: {"Fn::GetAtt": ["TelegramUsersTable", "Arn"]},
        },
    },
};

module.exports = serverlessConfiguration;
