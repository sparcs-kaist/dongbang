import { expose } from "./helpers/expose";
import { collections } from "../../collections";

export const membersQuery = collections.users.createQuery("members", {
    $filters: {
        isActive: true,
    },
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

expose(membersQuery);
