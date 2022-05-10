import {Meteor} from "meteor/meteor";
import {UserStatus} from "/imports/db/users";

import User = Meteor.User;

const users: Mongo.OptionalId<Meteor.User>[] = [
    {
        name: "권순호",
        username: "snowsuno",
        status: {
            type: UserStatus.OFFLINE,
            message: "",
        }
    },
    {
        name: "홍길동",
        username: "gil",
        status: {
            type: UserStatus.OFFLINE,
            message: "",
        }
    },
]

const createUser = (user: Mongo.OptionalId<Meteor.User>) => {
    if (!Meteor.users.findOne({username: user.username})) {
        Meteor.users.insert(user);
    }
}

Meteor.startup(() => {
    users.forEach(user => createUser(user));
});
