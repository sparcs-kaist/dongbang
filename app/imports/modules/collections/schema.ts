import {Mongo} from "meteor/mongo";

import {ClassConstructor} from "class-transformer";
import {metaStorage} from "/imports/modules/collections/metaStorage";
import {asyncToSync} from "/imports/custom/asyncToSync";

export const getCollection = asyncToSync(async <T>(collection: ClassConstructor<T>): Promise<Mongo.Collection<T>> => {
    return await metaStorage.collections.getAsync(collection.name);
});
