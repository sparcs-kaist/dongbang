import { Socket } from "socket.io";
import jwt from "jsonwebtoken";

import { status } from "./status";
import { deviceStatus } from "./devices";
import { collections } from "../../imports/collections";

export const listener = (socket: Socket) => {
    status.connect(socket);

    socket.on("devices", (devices: string[]) => {
        deviceStatus.change(devices);
    });

    socket.on("check", (deviceId: string, callback) => {
        callback(true);
    });

    interface RegisterProps {
        token: string;
        deviceId: string;
        force: boolean;
    }

    socket.on("register", (payload: RegisterProps, callback) => {
        try {
            const userId = jwt.verify(
                payload.token,
                Meteor.settings.private.privateKey,
            );

            if (
                payload.force &&
                payload.deviceId !==
                    collections.users.findOne(userId, {
                        fields: { deviceId: 1 },
                    })?.deviceId
            ) {
                return callback("override");
            }

            collections.users.update(userId, {
                $set: { deviceId: payload.deviceId },
            });

            return callback("success");
        } catch (e) {
            return callback("fail");
        }
    });

    socket.on("disconnect", () => {
        status.disconnect();
    });
};
