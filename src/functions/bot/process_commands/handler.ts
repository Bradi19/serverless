import {middyfy} from '@libs/aws/lambda';
import {formatJSONResponse} from "@libs/aws/api-gateway";
import {ICommandHandler} from "@libs/modules/telegram/commands/ICommandHandler";
import {COMMANDS} from '@libs/modules/telegram/commands';

const processCommands = async (event) => {
    if (!event?.body?.message?.text) {
        return formatJSONResponse({
            message: `Undefined command`,
            event,
        });
    }

    const {text} = event?.body?.message;
    const command: ICommandHandler | undefined = COMMANDS[text];

    if (!command) {
        return formatJSONResponse({
            message: `Unsupported command`,
            event,
        });
    }

    try {
        await command.handle(event.body.message);
    } catch (e) {
        return formatJSONResponse({
            message: `Unable to execute command`,
            event,
        });
    }

    return formatJSONResponse({
        message: `Command executed`,
        event,
    });
}

export const main = middyfy(processCommands);

// TODO handle block bot by user request (we need to delete the user from db)
// TODO create an interface for the event
// {
//     "body":{
//     "update_id":777880778,
//         "my_chat_member":{
//         "chat":{
//             "id":369368584,
//                 "first_name":"Vladyslav",
//                 "username":"electricfoal",
//                 "type":"private"
//         },
//         "from":{
//             "id":369368584,
//                 "is_bot":false,
//                 "first_name":"Vladyslav",
//                 "username":"electricfoal",
//                 "language_code":"ru"
//         },
//         "date":1636664331,
//             "old_chat_member":{
//             "user":{
//                 "id":2101233898,
//                     "is_bot":true,
//                     "first_name":"notybotyfy",
//                     "username":"notybotyfy_bot"
//             },
//             "status":"member"
//         },
//         "new_chat_member":{
//             "user":{
//                 "id":2101233898,
//                     "is_bot":true,
//                     "first_name":"notybotyfy",
//                     "username":"notybotyfy_bot"
//             },
//             "status":"kicked",
//                 "until_date":0
//         }
//     }
// }
// }