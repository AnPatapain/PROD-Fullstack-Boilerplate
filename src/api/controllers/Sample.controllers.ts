import { Request, Response} from "express";
import type { SampleModel } from "../../shared/models/SampleModel";
import { getToDayISOString } from "../../shared/utils"

export function getSample(req: Request, res: Response) {
    console.log(req);
    console.log(getToDayISOString());
    const sampleData: SampleModel = {
        message: "Hello 👋, Monolithic backend-frontend app with react-typescript-node. Docker for dev & prod and Nginx as reverse proxy"
    };
    res.json(sampleData);    
}
