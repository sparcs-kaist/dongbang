import {IsEnum, IsNotEmpty, IsOptional} from "class-validator";
import {InverseLink, LinkOne} from "/imports/modules/collections/decorators/links";
import {User} from "./internal";
import {createCollection} from "/imports/modules/collections/collection";

import {Inverse, One, Query} from "/imports/modules/collections/types";

export enum Location {
    A_SITE = "A SITE",
    B_SITE = "B SITE",
}

export class SessionSchema {
    @IsNotEmpty()
    name: string;
    
    @IsEnum(Location) @IsOptional()
    location?: Location;
    
    @LinkOne("User")
    creator: One<User>;
    
    @InverseLink("User.session")
    members: Inverse<User>;
}

export type Session = Query<SessionSchema>;

export const SessionsCollection = createCollection(SessionSchema);
