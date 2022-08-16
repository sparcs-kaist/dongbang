import { Meteor } from "meteor/meteor";

type AsyncFunction<T extends unknown[], U> = (...props: T) => Promise<U>;
type SyncFunction<T extends unknown[], U> = (...props: T) => U;

type Callback<U> = (error?: Meteor.Error, result?: U) => void;

export const asyncToSync = <T extends unknown[], U>(
    func: AsyncFunction<T, U>,
    context?: object,
): SyncFunction<T, U> =>
    Meteor.wrapAsync((...props: T) => {
        const callback = props.pop() as Callback<U>;

        func(...props)
            .then((res) => callback(undefined, res))
            .catch((e) => callback(e, undefined));
    }, context);
