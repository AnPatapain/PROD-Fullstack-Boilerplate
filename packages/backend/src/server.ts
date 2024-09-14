import express, {json, Request, Response, urlencoded} from "express";
import {RegisterRoutes} from "../tsoa/routes";
import swaggerDocument from "../tsoa/swagger.json" assert {type: "json"};
import swaggerUi from "swagger-ui-express";

const app = express();

// Use body parser to read sent json payloads
app.use(
    urlencoded({
        extended: true,
    })
);
app.use(json());
app.use("/api/docs", swaggerUi.serve, async (_req: Request, res: Response) => {
    return res.send(
        swaggerUi.generateHTML(swaggerDocument)
    );
});

RegisterRoutes(app);

app.listen(8080, () => {
    console.log('Listening on port 8080');
});
