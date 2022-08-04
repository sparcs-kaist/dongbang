import { IsEnum, IsNotEmpty, IsOptional } from "class-validator";
// import { InverseLink, LinkOne } from "/imports/modules/collections/decorators/links";


import {
    One,
    Inverse,
    Schema,
    createCollection,
    Link
} from "../modules/collections";

import type { User } from "./users";

export enum Location {
    A_SITE = "A SITE",
    B_SITE = "B SITE",
}

@Schema("session")
export class Session {
    @IsNotEmpty()
    name: string;
    
    @IsEnum(Location) @IsOptional()
    location?: Location;
    
    @Link("user")
    creator: One<User>;
    
    @Link("user.session")
    members: Inverse<User>;
}

export const SessionsCollection = createCollection(Session);
