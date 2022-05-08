import {Mongo} from "meteor/mongo";

export interface Member {
    _id?: string;
    name: string;
    nickname: string;
    status: MemberStatus
}

export interface MemberStatus {
    type: MemberStatusType;
    message?: string;
}

export enum MemberStatusType {
    ONLINE = "status:online",
    SESSION = "status:session"
}

export const MemberCollection = new Mongo.Collection<Member>("members");
