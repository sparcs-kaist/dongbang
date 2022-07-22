import "reflect-metadata";
import { IsOptional, IsString } from "class-validator";

import { metaStorage } from "../metaStorage";
import { sync } from "../common/asyncWrapper";

const checkTypes = (target: Object, propertyKey: string | symbol, expectedType: string, expectedTypeName?: string) => {
    const type = Reflect.getMetadata("design:type", target, propertyKey);
    
    if (type.name !== expectedType) {
        console.warn(
            "[warning]",
            `Wrong type "${type.name}" of property "${String(propertyKey)}". Consider changing it to "${expectedTypeName || expectedType}".`,
        );
    }
};

const registerIdField = (target: Object, relatedField: string | symbol) => {
    IsString()(target, `${String(relatedField)}Id`);
    IsOptional()(target, `${String(relatedField)}Id`);
};

export const LinkOne = <T> (relation: string): PropertyDecorator => sync(async (target, propertyKey) => {
    registerIdField(target, `${String(propertyKey)}Id`);
    // checkTypes(target, propertyKey, relation);
    
    const collection = await metaStorage.collections.getAsync(target.constructor.name);
    const relatedCollection = await metaStorage.collections.getAsync(relation);
    
    collection.addLinks({
        [String(propertyKey)]: {
            type: "one",
            collection: relatedCollection,
            field: `${String(propertyKey)}Id`,
        },
    });
    
    metaStorage.links.set(`${target.constructor.name}.${String(propertyKey)}`, "Qwer");
});

export const LinkMany = <T> (relation: string): PropertyDecorator => sync(async (target, propertyKey) => {
    registerIdField(target, `${String(propertyKey)}Id`);
    // checkTypes(target, propertyKey, "Array", `${relation}[]`);
    
    const collection = await metaStorage.collections.getAsync(target.constructor.name);
    const relatedCollection = await metaStorage.collections.getAsync(relation);
    
    collection.addLinks({
        [String(propertyKey)]: {
            type: "many",
            collection: relatedCollection,
            field: `${String(propertyKey)}Id`,
        },
    });
});

export const InverseLink = <T> (fieldKey: `${string}.${string}`): PropertyDecorator => sync(async (target, propertyKey) => {
    const [relation, field] = fieldKey.split(".", 2);
    // checkTypes(target, propertyKey, "Array", `${relation}[]`)
    
    const relatedCollection = await metaStorage.collections.getAsync(relation);
    const collection = await metaStorage.collections.getAsync(target.constructor.name);
    
    await metaStorage.links.getAsync(fieldKey);
    
    collection.addLinks({
        [String(propertyKey)]: {
            collection: relatedCollection,
            inversedBy: field,
        },
    });
});
