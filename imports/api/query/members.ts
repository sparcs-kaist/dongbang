import {Meteor} from "meteor/meteor";
import {expose} from "./helpers/expose";

import {UserStatus} from "/imports/db/users";

export const userQuery = Meteor.users.createQuery("user", {
    $filters: {
        "status.type": {$ne: UserStatus.OFFLINE}
    },
    $options: {
        sort: {name: 1}
    },
    name: 1,
    username: 1,
    status: 1,
    session: {
        name: 1,
        location: 1
    },
});

expose(userQuery);
