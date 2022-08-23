import { Meteor } from "meteor/meteor";
import { WebApp } from "meteor/webapp";
import express from "express";

import { status, device } from "./routes";

import { Server } from "socket.io";
import { Connection } from "./connection";
import { trackerStatus } from "../../imports/tracker";

// export const connection = new Connection(Meteor.settings.private.token);

export const initApp = () => {
    const io = new Server(WebApp.httpServer);
    trackerStatus.error = {};

    io.use((socket, next) => {
        if (
            socket.handshake.auth.token !==
            Meteor.settings.private.internal.token
        ) {
            next(new Error("unauthorized"));
        }
        next();
    });

    io.on("connection", (socket) => {
        console.log("a user connected");
        storage.status = true;

        socket.on("message", (msg) => {
            console.log(msg);
        });

        socket.on("disconnect", () => {
            console.log("user disconnected");
            storage.status = false;
        });

        socket.on("sdf", (msg) => {
            console.log(msg);
        });
    });
    // const app = express();
    // app.use(express.json());
    // app.use("/status", status.router);
    // app.use("/device", device.router);
    // WebApp.connectHandlers.use("/api", app);
};
