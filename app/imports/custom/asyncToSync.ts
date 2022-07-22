import { Meteor } from "meteor/meteor";

type AsyncFunction<T extends any[], U> = (...props: T) => Promise<U>;
type SyncFunction<T extends any[], U> = (...props: T) => U;

type Callback<U> = (error?: Meteor.Error, result?: U) => void;

export const asyncToSync = <T extends any[], U> (func: AsyncFunction<T, U>, context?: Object): SyncFunction<T, U> => (
    Meteor.wrapAsync((
        ...props: T
    ) => {
        const callback = props.pop() as Callback<U>;
        
        func(...props)
            .then(res => callback(undefined, res))
            .catch(e => callback(e, undefined));
        
        // try {
        //     const res = await func(...props);
        //     callback(undefined, res);
        // } catch (e: unknown) {
        //     if (e instanceof Meteor.Error) {
        //         callback(e, undefined);
        //     } else {
        //         callback(new Meteor.Error(String(e)), undefined);
        //     }
        // }
    }, context)
);
