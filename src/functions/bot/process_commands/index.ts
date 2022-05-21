import { handlerPath } from '@libs//aws/handler-resolver';

const handler = {
    handler: `${handlerPath(__dirname)}/handler.main`,
    events: [
        {
            http: {
                method: 'post',
                path: 'telegram/processCommands',
            }
        }
    ]
}

export default handler;