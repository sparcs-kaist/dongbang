import { IsEnum, IsNotEmpty, IsOptional } from "class-validator";
import { InverseLink, LinkOne } from "/imports/modules/collections/decorators/links";
import { User } from "./init";
import { createCollection } from "/imports/modules/collections/collection";

import { Inverse, One } from "/imports/modules/collections/types";

export enum Location {
    A_SITE = "A SITE",
    B_SITE = "B SITE",
}

export class Session {
    @IsNotEmpty()
    name: string;
    
    @IsEnum(Location) @IsOptional()
    location?: Location;
    
    @LinkOne("User")
    creator: One<User>;
    
    @InverseLink("User.session")
    members: Inverse<User>;
}

export const SessionsCollection = createCollection(Session);
