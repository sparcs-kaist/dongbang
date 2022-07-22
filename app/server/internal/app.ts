import {WebApp} from "meteor/webapp";
import express from "express";

import {status, device} from "./routes";

export const initApp = () => {
    const app = express();
    app.use(express.json());
    
    app.use("/status", status.router);
    app.use("/device", device.router);
    
    WebApp.connectHandlers.use("/api", app);
}
