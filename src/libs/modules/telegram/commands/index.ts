import {Greet} from "./Greet";
import {Subscribe} from "./Subscribe";
import {Unsubscribe} from "./Unsubscribe";
import {ICommandHandler} from "./ICommandHandler";

export const COMMANDS: Record<string, ICommandHandler> = {
    '/subscribe': new Subscribe(),
    '/unsubscribe': new Unsubscribe(),
    '/greet': new Greet()
}