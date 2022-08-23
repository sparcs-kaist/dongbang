import { Socket } from "socket.io";
import { status } from "./status";
import { deviceStatus } from "./devices";

export const listener = (socket: Socket) => {
    status.connect();

    socket.on("devices", (devices: string[]) => {
        deviceStatus.change(devices);
    });

    socket.on("disconnect", () => {
        status.disconnect();
    });
};
