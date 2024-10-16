import {Message} from "./Message.ts";

export type User = {
    id: number;
    email: string;
    name: string;
    messages: Message[];
}