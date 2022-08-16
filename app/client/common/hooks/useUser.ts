import { Meteor } from "meteor/meteor";

import { userQuery } from "/imports/api/query/user";
import { useTracker } from "meteor/react-meteor-data";

export const useUser = () =>
    useTracker(() => {
        const clientQuery = userQuery.clone({
            filters: { _id: Meteor.userId() },
        });
        const handler = clientQuery.subscribe();

        if (!handler.ready()) {
            return undefined;
        }

        return clientQuery.fetchOne();
    });
