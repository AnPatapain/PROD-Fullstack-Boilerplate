import { Request, Response} from "express";
import {Message} from "@app/models/src/SampleModel";

export function getOneMessage(req: Request, res: Response) {
    const sampleData: Message = {
        timeStamp: new Date(),
        content: 'Hello from backend 👋'
    };
    res.json(sampleData);
}
