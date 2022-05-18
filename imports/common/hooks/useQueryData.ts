import {useTracker} from "meteor/react-meteor-data";
import {Mongo} from "meteor/mongo";

interface UseQueryData<D> {
    data: D[];
    loading: boolean
}

export const useQueryData = <T, U = T>(
    query: Mongo.GraphQuery<T, U>
): U[] | undefined =>
    useTracker(() => {
        const localQuery = query.clone();
        const handler = localQuery.subscribe();
        
        if (!handler.ready()) {
            return undefined;
        }
        
        return localQuery.fetch();
    });


