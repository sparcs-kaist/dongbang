import {useTracker} from "meteor/react-meteor-data";
import {Mongo} from "meteor/mongo";

export const useQueryData = <T, U = T>(
    query: Mongo.GraphQuery<T, U>
): U[] | undefined =>
    useTracker(() => {
        const clientQuery = query.clone();
        const handler = clientQuery.subscribe();
        
        if (!handler.ready()) {
            return undefined;
        }
        
        return clientQuery.fetch();
    });


