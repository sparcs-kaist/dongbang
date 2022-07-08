import {SessionsCollection} from "/imports/collections/sessions";
import {expose} from "./helpers/expose";

import {createQuery} from 'meteor/cultofcoders:grapher';

export const sessionsQuery = createQuery("session", {
    Session: {
        name: 1,
        location: 1,
        creator: {
            name: 1
        },
        members: {
            name: 1,
            username: 1,
        },
    }
});

expose(sessionsQuery);
