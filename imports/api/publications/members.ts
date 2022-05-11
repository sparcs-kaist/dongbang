import {Meteor} from "meteor/meteor";

// Meteor.publish("members", function publishMembers() {
//
//
//     return Meteor.users.find({}, {
//         fields: {
//             name: 1,
//             username: 1,
//             status: 1
//         }
//     });
// })

export const userQuery = Meteor.users.createQuery("user", {
    name: 1,
    username: 1,
    status: 1,
    session: {
        name: 1,
        location: 1
    },
})
