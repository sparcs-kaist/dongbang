import { Meteor } from "meteor/meteor";
import { bindCollection, createCollection } from "../utils/collections";

import { User } from "./users";
import { Session } from "./sessions";
import { Device } from "./devices";

export const collections = {
    users: bindCollection(Meteor.users, User),
    sessions: createCollection(Session),
    devices: createCollection(Device),
};
