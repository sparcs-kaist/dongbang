import {SessionCollection} from "/imports/db/sessions";


export const sessionQuery = SessionCollection.createQuery("session", {
    name: 1,
    location: 1,
    creator: {
        name: 1
    },
    members: {
        name: 1
    },
},
    // {scoped: true}
)
