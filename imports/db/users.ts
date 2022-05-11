import {Meteor} from "meteor/meteor";
import SimpleSchema from "simpl-schema";
import {Enum, Optional} from "/imports/custom/simpl-schema";

import {SessionCollection} from "/imports/db/sessions";

import {SessionOut} from "/imports/db/sessions";


export enum UserStatus {
    PRESENT = "userstatus:present",
    SESSION = "userstatus:session",
    OFFLINE = "userstatus:offline",
}


export interface User {
    _id?: string;
    name: string;
    username: string;
    status: {
        type: UserStatus;
        message?: string;
    };
    sessionId?: string;
    session?: SessionOut;
}

Meteor.users.schema = new SimpleSchema({
    name: String,
    username: String,
    status: new SimpleSchema({
        type: Enum(UserStatus),
        message: Optional(String),
    }),
    services: {
        type: Object,
        optional: true,
        blackbox: true,
    },
    sessionId: Optional(String),
});


Meteor.users.attachSchema(Meteor.users.schema);

Meteor.users.addLinks({
    "session": {
        type: "one",
        collection: SessionCollection,
        field: "sessionId"
    }
});
