import {SessionCollection} from "/imports/db/sessions";
import {expose} from "./helpers/expose";

export const sessionsQuery = SessionCollection.createQuery("session", {
    name: 1,
    location: 1,
    creator: {
        name: 1
    },
    members: {
        name: 1
    },
});

expose(sessionsQuery);
