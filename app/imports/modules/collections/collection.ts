import {Mongo} from "meteor/mongo";

import {ClassConstructor} from "class-transformer";
import {metaStorage} from "/imports/modules/collections/metaStorage";

import {SchemaObject} from "openapi3-ts";
import {targetConstructorToSchema} from "class-validator-jsonschema";
import {Mutation, Query, SchemaCollection} from "/imports/modules/collections/types";


export const createCollection = <T>(schema: ClassConstructor<T>): SchemaCollection<T> => {
    if (metaStorage.collections.contains(schema.name)) {
        return metaStorage.collections.get(schema.name);
    }
    
    const collection = new Mongo.Collection<Mutation<T>, Query<T>>(schema.name);
    addSchema(collection, targetConstructorToSchema(schema));
    
    metaStorage.collections.set(schema.name, collection);
    return collection;
}

export const bindCollection = <T>(collection: Mongo.Collection<any>, schema: ClassConstructor<T>): SchemaCollection<T> => {
    addSchema(collection, targetConstructorToSchema(schema));
    
    metaStorage.collections.set(schema.name, collection);
    return collection;
}


const addSchema = <T>(collection: SchemaCollection<T>, jsonSchema: SchemaObject) => {
    if (Meteor.isServer) {
        const _addSchema = async () => {
            await collection.rawDatabase().command({
                collMod: collection._name,
                validator: {
                    $jsonSchema: jsonSchema,
                }
            });
        }
        
        _addSchema().catch(e => {
            const {name, code} = e as { name: string, code: number };
            
            if (name === "MongoServerError" && code === 26) {
                forceCreate(collection);
                _addSchema().catch(e => {throw e});
            }
        });
    }
}

const forceCreate = <T>(collection: SchemaCollection<T>) => {
    collection.remove(
        collection.insert({} as unknown as Mongo.OptionalId<Mutation<T>>)
    );
}

