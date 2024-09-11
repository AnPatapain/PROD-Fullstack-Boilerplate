import {Message} from "@app/models/src/Message";
import {getPrintableMessage} from "@app/shared/src/utils";
import {Controller, Get, Path, Route} from "tsoa";

const messages: string[] = [
    'Message 0',
    'Message 1',
    'Message 2',
    'Message 3',
]

@Route("/api/messages")
export class SampleController extends Controller {
    @Get("sample")
    public async getSampleMessage(): Promise<Message> {
        const message: Message = {
            timeStamp: new Date(),
            content: 'Hello from backend 👋'
        };
        console.log(getPrintableMessage(message));
        return message;
    }
    @Get("")
    public async getMessages(): Promise<Message[]> {
        return messages.map<Message>((messageStr: string) => {
            return {
                timeStamp: new Date(),
                content: messageStr
            };
        })
    }
    @Get("{messageId}")
    public async getMessageById(
        @Path() messageId: number
    ): Promise<Message> {
        if (messageId < 0 || messageId >= messages.length) {
            throw new Error(`messageID must be in the range [0, ${messages.length-1}]`)
        }
        return {
            timeStamp: new Date(),
            content: messages.at(messageId) as string,
        };
    }
}
