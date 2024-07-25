import { Request, Response} from "express";
import {Message} from "@app/models/src/Message";
import {getPrintableMessage} from "@app/shared/src/utils";

export function getOneMessage(req: Request, res: Response) {
    const message: Message = {
        timeStamp: new Date(),
        content: 'Hello from backend 👋'
    };
    console.log(getPrintableMessage(message));
    res.json(message);
}
