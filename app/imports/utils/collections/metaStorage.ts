import { BaseCollection, BaseSchema } from "./types";
import { AsyncKeyValueStorage } from "./common/asyncStorage";

export const metaStorage = {
    collections: new AsyncKeyValueStorage<string, BaseCollection>(),
    schemas: new AsyncKeyValueStorage<BaseSchema, string>(),
    links: new AsyncKeyValueStorage<string, true>(),
} as const;
