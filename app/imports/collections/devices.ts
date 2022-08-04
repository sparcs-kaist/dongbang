import { IsNotEmpty } from "class-validator";
import {
    Link,
    One,
    createCollection,
    Schema,
} from "../modules/collections";

import type { User } from "./users";

// import {LinkOne} from "/imports/modules/collections/decorators/links";
// import {One} from "/imports/modules/collections/types";
// import {User} from "/imports/collections/users";
// import {createCollection} from "/imports/modules/collections";

@Schema("device")
export class Device {
    @IsNotEmpty()
    macAddress: string;
    
    @Link("user")
    user: One<User>;
}

export const DevicesCollection = createCollection(Device);
