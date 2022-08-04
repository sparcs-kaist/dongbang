import { Mongo } from "meteor/mongo";

import { ClassConstructor } from "class-transformer";
import { metaStorage } from "./metaStorage";

import { SchemaObject } from "openapi3-ts";
import { targetConstructorToSchema } from "class-validator-jsonschema";
import { Mutation } from "./types";

const registerCollection = (schema: ClassConstructor<any>, bind?: Mongo.Collection<any>) => {
    const schemaName = metaStorage.schemas.get(schema.name);
    if (!schemaName) {
        throw new Error(`Schema "${schema.name}" is not registered. Try decorating it with @Schema`);
    }
    
    const collection = bind || new Mongo.Collection(schemaName);
    
    addSchema(collection, targetConstructorToSchema(schema));
    metaStorage.collections.set(schemaName, collection);
    
    return collection;
}

export const createCollection = <T> (
    schema: ClassConstructor<T>,
): Mongo.SchemaCollection<T> => {
    return registerCollection(schema);
};

export const bindCollection = <T> (
    collection: Mongo.Collection<any>,
    schema: ClassConstructor<T>,
): Mongo.SchemaCollection<T> => {
    return registerCollection(schema, collection);
};

const addSchema = <T> (collection: Mongo.SchemaCollection<T>, jsonSchema: SchemaObject) => {
    if (Meteor.isServer) {
        const _addSchema = async () => {
            await collection.rawDatabase().command({
                collMod: collection._name,
                validator: {
                    $jsonSchema: jsonSchema,
                },
            });
        };
        
        _addSchema().catch(e => {
            const { name, code } = e as { name: string, code: number };
            
            if (name === "MongoServerError" && code === 26) {
                forceCreate(collection);
                _addSchema().catch(e => {throw e;});
            }
        });
    }
};

const forceCreate = <T> (collection: Mongo.SchemaCollection<T>) => {
    collection.remove(
        collection.insert({} as unknown as Mongo.OptionalId<Mutation<T>>),
    );
};

