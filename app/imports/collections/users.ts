import {Meteor} from "meteor/meteor";
import {Session} from "./internal";

import {IsBoolean, IsObject, IsOptional, IsString} from "class-validator";
import {LinkOne} from "/imports/modules/collections/decorators/links";
import {bindCollection} from "/imports/modules/collections";
import {One} from "/imports/modules/collections/types";


export class User {
    @IsString()
    name: string;

    @IsString()
    username: string;

    @IsBoolean()
    isActive: boolean;

    @IsOptional() @IsString()
    statusMsg?: string;

    @IsOptional() @IsObject()
    services?: object;
    
    @LinkOne("Session")
    session: One<Session>;
}

export const UsersCollection = bindCollection(Meteor.users, User);
