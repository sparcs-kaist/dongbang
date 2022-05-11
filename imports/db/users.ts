import {Meteor} from "meteor/meteor";
import SimpleSchema from "simpl-schema";
import {Enum} from "/imports/custom/simpl-schema";

import {SessionCollection} from "/imports/db/sessions";

import {Session} from "/imports/db/sessions";


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
    sessionId?: string;
    session?: Session;
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
    },
    sessionId: {type: String, optional: true},
})

const a = {
    validate(obj: any) {
        console.log(obj)
    }
}

Meteor.users.attachSchema(Meteor.users.schema);

Meteor.users.addLinks({
    // "session": {
    //     collection: SessionCollection,
    //     inversedBy: "members",
    // }
    "session": {
        type: "one",
        collection: SessionCollection,
        field: "sessionId"
    }
})
