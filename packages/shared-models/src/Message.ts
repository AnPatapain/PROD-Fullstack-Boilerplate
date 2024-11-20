export class Message {
    readonly id: number;
    public userId: number;
    public timeStamp: Date;
    public content: string;

    constructor(id: number, userId: number, timeStamp: Date, content: string) {
        this.id = id;
        this.userId = userId;
        this.timeStamp = timeStamp;
        this.content = content;
    }
}