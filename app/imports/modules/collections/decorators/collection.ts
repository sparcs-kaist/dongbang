import {Mongo} from "meteor/mongo";

import {targetConstructorToSchema} from "class-validator-jsonschema";
import {metaStorage} from "../metaStorage";
import {sync} from "../common/asyncWrapper";

import {SchemaObject} from "openapi3-ts";


export const Collection = <T>(collection?: Mongo.Collection<T>): ClassDecorator => sync(async (target) => {
    const name = collection ? collection.rawCollection().collectionName : target.name;
    const generatedCollection = collection || new Mongo.Collection<T>(target.name);
    
    const jsonSchema = targetConstructorToSchema(target);
    await addSchema<T>(generatedCollection, jsonSchema);
    
    metaStorage.collections.set(name, generatedCollection);
});

const addSchema = async <T>(collection: Mongo.Collection<T>, jsonSchema: SchemaObject) => {
    const _addSchema = async () => {
        await collection.rawDatabase().command({
            collMod: collection.rawCollection().collectionName,
            validator: {
                $jsonSchema: jsonSchema,
            }
        });
    }
    
    try {
        await _addSchema();
    } catch (e) {
        const {name, code} = e as { name: string, code: number };
        
        if (name === "MongoServerError" && code === 26) {
            forceCreate(collection);
            await _addSchema();
        }
    }
}

const forceCreate = <T>(collection: Mongo.Collection<T>) => {
    collection.remove(
        collection.insert({} as unknown as Mongo.OptionalId<T>)
    );
}
