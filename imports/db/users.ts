import {Meteor} from "meteor/meteor";
import SimpleSchema from "simpl-schema";


// const Options = (...values: string[]) =>
//     new RegExp(`^${values.map(v => `(${v})`).join("|")}$`);

const Enum = (enumObj: Object) =>
    new RegExp(`^${
        Object
            .values(enumObj)
            .map(v => `(${v})`)
            .join("|")
    }$`);


export enum UserStatus {
    PRESENT = "userstatus:present",
    SESSION = "userstatus:session",
    OFFLINE = "userstatus:offline",
}


export interface ExtendUser {
    name: string;
    nickname: string;
    status: UserStatus;
}

Meteor.users.schema = new SimpleSchema({
    name: String,
    nickname: String,
    status: Enum(UserStatus),
    services: {
        type: Object,
        optional: true,
        blackbox: true,
    }
})

Meteor.users.attachSchema(Meteor.users.schema);


