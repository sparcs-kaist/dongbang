import { Mongo } from "meteor/mongo";

import { AsyncKeyValueStorage } from "./common/asyncStorage";

export const metaStorage = {
    collections: new AsyncKeyValueStorage<string, Mongo.SchemaCollection<any>>(),
    schemas: new AsyncKeyValueStorage<Function, string>(),
    links: new AsyncKeyValueStorage<string, true>(),
} as const;
