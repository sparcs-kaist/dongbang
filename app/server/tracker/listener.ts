import { Meteor } from "meteor/meteor";

import { Socket } from "socket.io";
import jwt from "jsonwebtoken";

import { status } from "./status";
import { deviceStatus } from "./devices";
import { collections } from "../../imports/collections";

export const listener = Meteor.bindEnvironment((socket: Socket) => {
    if (!status.connect(socket)) return;

    socket.on("devices", (devices: string[]) => {
        deviceStatus.change(devices);
    });

    interface RegisterProps {
        token: string;
        deviceId: string;
        force: boolean;
    }

    socket.on(
        "register",
        Meteor.bindEnvironment((payload: RegisterProps, callback) => {
            try {
                const { userId } = jwt.verify(
                    payload.token,
                    Meteor.settings.private.privateKey,
                ) as { userId: string };

                console.log();
                console.log(Date.now());

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
                console.error(e);
                console.log(e instanceof jwt.TokenExpiredError);
                return callback("fail");
            }
        }),
    );

    socket.on("disconnect", () => {
        status.disconnect();
    });
});
