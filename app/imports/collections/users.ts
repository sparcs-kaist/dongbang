import { IsBoolean, IsObject, IsOptional, IsNotEmpty, IsString } from "class-validator";
import { Link, Schema, One } from "../modules/collections";

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
