import { Mongo } from "meteor/mongo";

import { AsyncKeyValueStorage } from "./common/asyncStorage";

export const metaStorage = {
    collections: new AsyncKeyValueStorage<Mongo.SchemaCollection<any>>(),
    schemas: new AsyncKeyValueStorage<string>(),
    links: new AsyncKeyValueStorage<true>(),
} as const;
