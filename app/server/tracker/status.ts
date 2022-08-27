import { tracker, TrackerError } from "/imports/tracker";
import { Socket } from "socket.io";

export const status = {
    // setError(error: TrackerError | null) {
    //     trackerStatus.error = error;
    // },

    disconnect() {
        tracker.ipAddr = null;
        // this.setError({ message: "Tracker offline" });
    },

    connect(socket: Socket) {
        tracker.ipAddr = socket.conn.remoteAddress;
        // this.setError(null);
    },
};
