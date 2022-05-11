import {Meteor} from "meteor/meteor";
import {expose} from "./helpers/expose";

export const userQuery = Meteor.users.createQuery("user", {
    name: 1,
    username: 1,
    status: 1,
    session: {
        name: 1,
        location: 1
    },
});

expose(userQuery);
