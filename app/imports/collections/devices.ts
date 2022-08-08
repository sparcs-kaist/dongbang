import { IsNotEmpty } from "class-validator";
import { Link, One, Schema } from "../modules/collections";

import type { User } from "./users";

@Schema("device")
export class Device {
    @IsNotEmpty()
    macAddress: string;

    @Link("user")
    user: One<User>;
}
