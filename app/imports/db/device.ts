import {Meteor} from "meteor/meteor";

import {Mongo} from "meteor/mongo";
import SimpleSchema from "simpl-schema";

export interface DeviceCreate {
    macAddress: string;
    userId: string;
}

export interface Device extends DeviceCreate {
    _id: string;
    user: Meteor.User;
}

export const DevicesCollection = new Mongo.Collection<DeviceCreate, Device>("devices");

DevicesCollection.schema = new SimpleSchema({
    macAddress: String,
    userId: String,
});

DevicesCollection.attachSchema(DevicesCollection.schema);

DevicesCollection.addLinks({
    "user": {
        type: "one",
        collection: Meteor.users,
        field: "userId"
    }
});
