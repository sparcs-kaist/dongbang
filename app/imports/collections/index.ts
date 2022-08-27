import { Meteor } from "meteor/meteor";
import { bindCollection, createCollection } from "../utils/collections";

import { User } from "./users";
import { Session } from "./sessions";

export const collections = {
    users: bindCollection(Meteor.users, User),
    sessions: createCollection(Session),
};
