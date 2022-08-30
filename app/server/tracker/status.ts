import { tracker } from "/imports/tracker";
import { Socket } from "socket.io";

export const status = {
    disconnect() {
        tracker.ipAddr = null;
    },

    connect(socket: Socket) {
        const ipAddr = socket.handshake.headers["x-real-ip"];

        if (tracker.ipAddr || !ipAddr) {
            socket.disconnect();
            return false;
        }

        tracker.ipAddr = typeof ipAddr === "string" ? ipAddr : ipAddr[0];
        return true;
    },
};
