import { collections } from "../../collections";
import { IsNotEmpty } from "class-validator";
import { method } from "../../utils/methods";

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
    resolve({ userId }) {
        console.log(userId);
    },
});
