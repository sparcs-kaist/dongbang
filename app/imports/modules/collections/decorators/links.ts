import "reflect-metadata";
import {ClassConstructor} from "class-transformer";
import {IsOptional, IsString} from "class-validator";

import {metaStorage} from "../metaStorage";
import {sync} from "../common/asyncWrapper";

const checkTypes = (target: Object, propertyKey: string | symbol, expectedType: ClassConstructor<any>, expectedTypeName?: string) => {
    const type = Reflect.getMetadata("design:type", target, propertyKey);
    
    if (type !== expectedType) {
        console.warn(
            "[warning]",
            `Wrong type "${type.name}" of property "${String(propertyKey)}". Consider changing it to "${expectedTypeName || expectedType.name}".`
        );
    }
}

const registerIdField = (target:Object, relatedField: string | symbol) => {
    IsString()(target, `${String(relatedField)}Id`);
    IsOptional()(target, `${String(relatedField)}Id`);
}


export const LinkOne = <T>(relation: ClassConstructor<T>): PropertyDecorator => sync(async (target, propertyKey) => {
    registerIdField(target, `${String(propertyKey)}Id`);
    checkTypes(target, propertyKey, relation);
    
    const collection = await metaStorage.collections.getAsync(target.constructor.name);
    const relatedCollection = await metaStorage.collections.getAsync(relation.name);
    
    collection.addLinks<T>({
        [String(propertyKey)]: {
            type: "one",
            collection: relatedCollection,
            field: `${String(propertyKey)}Id`,
        }
    });
});

export const LinkMany = <T>(relation: ClassConstructor<T>): PropertyDecorator => sync(async (target, propertyKey) => {
    registerIdField(target, `${String(propertyKey)}Id`);
    checkTypes(target, propertyKey, Array, `${relation.name}[]`);
    
    const collection = await metaStorage.collections.getAsync(target.constructor.name);
    const relatedCollection = await metaStorage.collections.getAsync(relation.name);
    
    collection.addLinks<T>({
        [String(propertyKey)]: {
            type: "many",
            collection: relatedCollection,
            field: `${String(propertyKey)}Id`,
        }
    });
});

export const InverseLink = <T>(fieldKey: `${string}.${string}`): PropertyDecorator => sync(async (target, propertyKey) => {
    const [relatedSchemaName, relatedFieldName] = fieldKey.split(".", 2);
    checkTypes(target, propertyKey, Array, `${relatedSchemaName}[]`)
    
    const relatedCollection = await metaStorage.collections.getAsync(relatedSchemaName);
    const collection = await metaStorage.collections.getAsync(target.constructor.name);
    
    collection.addLinks<T>({
        [String(propertyKey)]: {
            collection: relatedCollection,
            inversedBy: relatedFieldName
        }
    });
});
