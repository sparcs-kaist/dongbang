import { IsNotEmpty } from "class-validator";
import { Link, One, Schema } from "../utils/collections";

import type { User } from "./users";

@Schema("device")
export class Device {
    @IsNotEmpty()
    deviceId: string;

    @Link("user")
    user: One<User>;
}
