import { Request, Response} from "express";
import type { SampleModel } from "@models/SampleModel";
import { getToDayISOString } from "@shared/utils"

export function getSample(req: Request, res: Response) {
    const sampleData: SampleModel = {
        message: `Hello 👋, Monolithic fullstack app. Today is ${getToDayISOString()}`
    };
    res.json(sampleData);
}
