import {Mongo} from "meteor/mongo";
import {AsyncKeyValueStorage} from "./common/asyncStorage";

export const metaStorage = {
    collections: new AsyncKeyValueStorage<Mongo.Collection<any>>(),
    // links: new AsyncKeyValueStorage<string>(),
} as const;
