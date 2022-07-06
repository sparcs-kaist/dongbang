import {Meteor} from "meteor/meteor";

import {Mongo} from "meteor/mongo";
import SimpleSchema from "simpl-schema";
import {Enum, Optional} from "/imports/custom/simpl-schema";

export enum Location {
    A_SITE = "location:a_site",
    B_SITE = "location:b_site",
}

export const LOCATION_NAME = {
    [Location.A_SITE]: "A SITE",
    [Location.B_SITE]: "B SITE",
} as const;

interface SessionCreate {
    name: string;
    location?: Location;
    creatorId: string;
}

export interface Session extends SessionCreate {
    _id: string;
    members: Meteor.User[];
}

export const SessionsCollection = new Mongo.Collection<SessionCreate, Session>("sessions");

SessionsCollection.schema = new SimpleSchema({
    name: String,
    location: Optional(Enum(Location)),
    creatorId: String,
});

SessionsCollection.attachSchema(SessionsCollection.schema);

SessionsCollection.addLinks({
    "members": {
        collection: Meteor.users,
        inversedBy: "session",
    }
});
