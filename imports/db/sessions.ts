import {Mongo} from "meteor/mongo";
import SimpleSchema from "simpl-schema";

export enum Location {
    A_SITE = "location:a_site",
    B_SITE = "location:b_site",
}

export interface Session {
    name: string,
    location?: Location,
}

export const SessionCollection = new Mongo.Collection<Session>("sessions");

SessionCollection.schema = new SimpleSchema({

})

SessionCollection.attachSchema(SessionCollection.schema);
