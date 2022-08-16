import { expose } from "/imports/api/query/helpers/expose";
import { collections } from "../../collections";

export const userQuery = collections.users.createQuery("user", {
    $options: {
        sort: { name: 1 },
    },
    name: 1,
    username: 1,
    isActive: 1,
    statusMsg: 1,
    session: {
        name: 1,
        location: 1,
    },
});

expose(userQuery);
