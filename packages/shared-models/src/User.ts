import {Message} from "./Message";

export class User {
    readonly id: number;
    public email: string;
    public name: string | null;
    public messages: Array<Message>;

    constructor(id: number, email: string, name: string, messages: Array<Message>) {
        this.id =  id;
        this.email = email;
        this.name = name;
        this.messages = messages;
    }
}

export type UserCreation = Omit<User, 'id' | 'messages'>;