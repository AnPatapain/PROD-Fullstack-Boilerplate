import { Request, Response} from "express";
import type { SampleModel } from "../../../models/src/SampleModel";
import { getToDayISOString } from "../../../shared/src/utils"

export function getSample(req: Request, res: Response) {
    const sampleData: SampleModel = {
        message: `Hello 👋, Monolithic fullstack app. Today is ${getToDayISOString()}`
    };
    res.json(sampleData);    
}
