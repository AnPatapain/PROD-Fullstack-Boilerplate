import express, {json, Request, Response, urlencoded} from "express";
import {RegisterRoutes} from "../tsoa/routes";
import swaggerDocument from "../tsoa/swagger.json" assert {type: "json"};
import swaggerUi from "swagger-ui-express";
import {seed} from "./seed";
import {BackendConfig} from "./backendConfig";

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
// Register the routes and controller built by Tsoa to application
RegisterRoutes(app);

// Check BackendConfig
console.log("Backend Config::", BackendConfig);

// Seed data (only in development environment)
if (BackendConfig.mode === 'development') {
    await seed();
}

app.listen(8080, () => {
    console.log('Listening on port 8080');
});
