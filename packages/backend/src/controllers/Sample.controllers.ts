import { Request, Response} from "express";
import type { SampleModel } from "@app/models/SampleModel";

export function getSample(req: Request, res: Response) {
    const sampleData: SampleModel = {
        message: 'Hello 👋, Monolithic fullstack app. Today is:'
    };
    res.json(sampleData);
}
