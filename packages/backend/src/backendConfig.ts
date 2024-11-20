/**
 * Main configuration for backend, read from .env
 * author: Ke An Nguyen
 */
import { config } from "dotenv";
import path, { resolve } from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

config({path: resolve(__dirname, "../.env")});

type BackendConfigType = {
    mode: "development" | "production" | "test",
    dbConnectionUrl: string
}

export const BackendConfig: BackendConfigType = {
    mode: (process.env.NODE_ENV as "development" | "production" | "test") || "development",
    dbConnectionUrl: process.env.DATABASE_URL as string,
}