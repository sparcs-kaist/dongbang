import {useTracker} from "meteor/react-meteor-data";
import {Grapher} from "meteor/cultofcoders:grapher";

export const useQueryData = <T, U = T>(
    query: Grapher.Query<T, U>,
    options?: Object
): U[] | undefined =>
    useTracker(() => {
        const clientQuery = query.clone({...options});
        const handler = clientQuery.subscribe();
        
        if (!handler.ready()) {
            return undefined;
        }
        
        return clientQuery.fetch();
    });


