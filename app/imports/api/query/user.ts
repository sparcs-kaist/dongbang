import { expose } from "/imports/api/query/helpers/expose";
import { UsersCollection } from "../../collections/users";

export const userQuery = UsersCollection.createQuery("user", {
    // $filters({filters, params}) {
    //     // "status.type": {$ne: UserStatus.OFFLINE}
    //     // isActive: true
    //     // _id: params.userId
    //     filters._id = params.userId;
    // },
    // $filters: {
    //     _id: "x5f5t29XG9xHYEid9"
    // },
    $options: {
        sort: { name: 1 },
    },
    name: 1,
    username: 1,
    // status: 1,
    isActive: 1,
    statusMsg: 1,
    session: {
        name: 1,
        location: 1,
    },
});

expose(userQuery);
// if (Meteor.isServer) {
//     userQuery.expose({
//         firewall(userId: string, params: any) {
//             params.userId = userId;
//         }
//     })
// }
