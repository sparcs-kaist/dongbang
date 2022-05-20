import {Meteor} from "meteor/meteor";
import {SessionCollection} from "/imports/db/sessions";

Meteor.users.addLinks({
    "session": {
        type: "one",
        collection: SessionCollection,
        field: "sessionId"
    }
});

SessionCollection.addLinks({
    "members": {
        collection: Meteor.users,
        inversedBy: "session",
    }
});
