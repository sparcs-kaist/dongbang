import { Meteor } from "meteor/meteor";

import {
    IsBoolean,
    IsObject,
    IsOptional,
    IsNotEmpty,
    IsString,
} from "class-validator";

import {
    Link,
    Schema,
    One,
    bindCollection
} from "../modules/collections";

import type { Session } from "./sessions";

@Schema("user")
export class User {
    @IsNotEmpty()
    name: string;
    
    @IsNotEmpty()
    username: string;
    
    @IsBoolean()
    isActive: boolean;
    
    @IsOptional() @IsString()
    statusMsg?: string;
    
    @IsOptional() @IsObject()
    services?: object;
    
    @Link("session")
    session: One<Session>;
}

export const UsersCollection = bindCollection(Meteor.users, User);
