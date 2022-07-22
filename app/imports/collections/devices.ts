import { IsNotEmpty } from "class-validator";
import { LinkOne } from "../modules/collections/decorators/links";
import { One } from "../modules/collections/types";
import { createCollection } from "../modules/collections";

import { User } from "./init";

// import {LinkOne} from "/imports/modules/collections/decorators/links";
// import {One} from "/imports/modules/collections/types";
// import {User} from "/imports/collections/users";
// import {createCollection} from "/imports/modules/collections";

export class Device {
    @IsNotEmpty()
    macAddress: string;
    
    @LinkOne("User")
    user: One<User>;
}

export const DevicesCollection = createCollection(Device);
