import {Meteor} from "meteor/meteor";
import SimpleSchema from "simpl-schema";
import {Enum} from "/imports/custom/simpl-schema";


// const Options = (...values: string[]) =>
//     new RegExp(`^${values.map(v => `(${v})`).join("|")}$`);




export enum UserStatus {
    PRESENT = "userstatus:present",
    SESSION = "userstatus:session",
    OFFLINE = "userstatus:offline",
}


export interface ExtendUser {
    name: string;
    username: string;
    status: {
        type: UserStatus;
        message?: string;
    };
}

Meteor.users.schema = new SimpleSchema({
    name: String,
    username: String,
    status: new SimpleSchema({
        type: Enum(UserStatus),
        message: {type: String, optional: true},
    }),
    services: {
        type: Object,
        optional: true,
        blackbox: true,
    }
})

const a = {
    validate(obj: any) {
        console.log(obj)
    }
}

Meteor.users.attachSchema(Meteor.users.schema);


