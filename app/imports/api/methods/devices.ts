import { collections } from "../../collections";
import { IsNotEmpty } from "class-validator";
import { method } from "../../utils/methods";

class RegisterInput {
    @IsNotEmpty()
    macAddress: string;
}

export const register = method("devices.register", {
    input: RegisterInput,
    resolve(userId, input) {
        collections.devices.insert({ ...input, userId });
    },
});
