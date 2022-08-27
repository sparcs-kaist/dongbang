import { Meteor } from "meteor/meteor";
import { WebApp } from "meteor/webapp";
import { Server } from "socket.io";

import { useAuth } from "./auth";
import { listener } from "./listener";
import { status } from "./status";

export const init = () => {
    status.disconnect();
    const io = new Server(WebApp.httpServer);
    useAuth(io, Meteor.settings.private.tracker.token);

    io.on("connection", listener);
};
