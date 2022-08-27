import jwt from "jsonwebtoken";

import { collections } from "../../collections";
import { IsNotEmpty } from "class-validator";
import { method } from "../../utils/methods";
import { tracker, TrackerError } from "../../tracker";

// import { connection } from "/server/internal";

class RegisterInput {
    @IsNotEmpty()
    deviceId: string;
}

export const register = method("devices.register", {
    input: RegisterInput,
    resolve({ userId }, input) {
        collections.devices.insert({ ...input, userId });
    },
});

export const checkTrackerStatus = method("devices.checkTrackerStatus", {
    resolve({ userId, clientAddress }) {
        console.log(clientAddress);
        return clientAddress;
    },
});

export const isRegisterable = method("devices.isRegisterable", {
    resolve({ userId, clientAddress }): {
        registerable: boolean;
        error: TrackerError | null;
    } {
        if (tracker.error) {
            return {
                registerable: false,
                error: tracker.error,
            };
        }

        const user = collections.users.findOne(userId, {
            fields: { deviceId: 1 },
        });

        return {
            registerable: !!user?.deviceId,
            error: null,
        };
    },
});

export const getToken = method("devices.getToken", {
    resolve({ userId }) {
        return jwt.sign(userId, Meteor.settings.private.privateKey, {
            expiresIn: 10000,
        });
    },
});
