import {Meteor} from "meteor/meteor";
import {expose} from "./helpers/expose";

export const membersQuery = Meteor.users.createQuery("members", {
    $filters: {
        // "status.type": {$ne: UserStatus.OFFLINE}
        isActive: true
        // _id: {$eq: this.userId}
    },
    $options: {
        sort: {name: 1}
    },
    name: 1,
    username: 1,
    // status: 1,
    isActive: 1,
    statusMsg: 1,
    session: {
        name: 1,
        location: 1
    },
});

expose(membersQuery);
