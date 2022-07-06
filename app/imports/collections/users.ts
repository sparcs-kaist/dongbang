import {Meteor} from "meteor/meteor";
import SimpleSchema from "simpl-schema";
import {Optional} from "/imports/custom/simpl-schema";

import {Session, SessionsCollection} from "/imports/collections/sessions";


export interface UserExtension {
    _id?: string;
    name: string;
    username: string;
    isActive: boolean;
    statusMsg?: string;
    // status: {
    //     type: UserStatus;
    //     message?: string;
    // };
    sessionId?: string;
    session?: Session;
}

Meteor.users.schema = new SimpleSchema({
    name: String,
    username: String,
    isActive: Boolean,
    statusMsg: Optional(String),
    // status: new SimpleSchema({
    //     type: Enum(UserStatus),
    //     message: Optional(String),
    // }),
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
        collection: SessionsCollection,
        field: "sessionId"
    }
});


