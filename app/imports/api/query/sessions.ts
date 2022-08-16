import { expose } from "./helpers/expose";
import { collections } from "../../collections";

export const sessionsQuery = collections.sessions.createQuery("session", {
    name: 1,
    location: 1,
    creator: {
        name: 1,
    },
    members: {
        name: 1,
        username: 1,
    },
});

expose(sessionsQuery);
