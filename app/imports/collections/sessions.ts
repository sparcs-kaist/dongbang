import { IsEnum, IsNotEmpty, IsOptional } from "class-validator";
import { One, Inverse, Schema, Link } from "../modules/collections";

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
