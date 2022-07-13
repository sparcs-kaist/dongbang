import {AsyncKeyValueStorage} from "./common/asyncStorage";
import {SchemaCollection} from "/imports/modules/collections/types";

export const metaStorage = {
    collections: new AsyncKeyValueStorage<SchemaCollection<any>>(),
    links: new AsyncKeyValueStorage<string>(),
} as const;
