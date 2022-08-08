import { useTracker } from "meteor/react-meteor-data";
import { Grapher } from "meteor/cultofcoders:grapher";
import { Mutation, Query } from "/imports/modules/collections/types";

export const useQueryData = <T>(
    query: Grapher.Query<Mutation<T>, Query<T>>,
    options?: object,
): Query<T>[] | undefined =>
    useTracker(() => {
        const clientQuery = query.clone({ ...options });
        const handler = clientQuery.subscribe();

        if (!handler.ready()) {
            return undefined;
        }

        return clientQuery.fetch();
    });
