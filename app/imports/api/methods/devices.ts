import { Meteor } from "meteor/meteor";
import jwt from "jsonwebtoken";

import { collections } from "../../collections";
import { method } from "../../utils/methods";
import { tracker, TrackerError } from "../../tracker";

export const isRegisterable = method("devices.isRegisterable", {
    resolve({ userId, clientAddress }): {
        registerable: boolean;
        error: TrackerError | null;
    } {
        if (!Meteor.isServer) {
            return {
                registerable: false,
                error: null,
            };
        }
        console.log(userId, clientAddress, tracker.ipAddr);

        if (tracker.error) {
            return {
                registerable: false,
                error: tracker.error,
            };
        }

        if (clientAddress !== tracker.ipAddr) {
            return {
                registerable: false,
                error: null,
            };
        }

        const user = collections.users.findOne(userId, {
            fields: { deviceId: 1 },
        });

        return {
            registerable: !user?.deviceId,
            error: null,
        };
    },
});

export const getToken = method("devices.getToken", {
    resolve({ userId }) {
        if (!Meteor.isServer) {
            return "";
        }

        return jwt.sign({ userId }, Meteor.settings.private.privateKey, {
            expiresIn: 10,
        });
    },
});
