import "reflect-metadata";
import { IsOptional, IsString } from "class-validator";

import { metaStorage } from "../metaStorage";
import { sync } from "../common/asyncWrapper";
import { Inverse, Many, One } from "../types";

type LinkConstructorType = typeof One | typeof Many | typeof Inverse;
type LinkType = "one" | "many" | "inverse";
const linkMap = new Map<LinkConstructorType, LinkType>([
    [One, "one"],
    [Many, "many"],
    [Inverse, "inverse"],
] as const);

const registerIdField = (target: Object, relatedField: string | symbol) => {
    IsString()(target, `${String(relatedField)}Id`);
    IsOptional()(target, `${String(relatedField)}Id`);
};


export const Link = (relation: string): PropertyDecorator => sync(async (target, propertyKey) => {
    const linkType = linkMap.get(Reflect.getMetadata(
        "design:type",
        target,
        propertyKey,
    ));
    
    if (!linkType) {
        throw new Error(`Type of relational field "${String(propertyKey)}" must be One, Many or Inverse`);
    }
    
    const schemaName = await metaStorage.schemas.getAsync(target.constructor.name);
    const collection = await metaStorage.collections.getAsync(schemaName);
    
    if (linkType !== "inverse") {
        registerIdField(target, `${String(propertyKey)}Id`);
        
        const relatedCollection = await metaStorage.collections.getAsync(relation);
        
        collection.addLinks({
            [String(propertyKey)]: {
                type: linkType,
                collection: relatedCollection,
                field: `${String(propertyKey)}Id`,
            },
        });
        
        metaStorage.links.set(`${schemaName}.${String(propertyKey)}`);
    } else {
        const [relatedSchemaName, field] = relation.split(".", 2);
        
        if (!relatedSchemaName || !field) {
            throw new Error(`Inverse link must be in format "collectionName.field"`);
        }
        
        const relatedCollection = await metaStorage.collections.getAsync(relatedSchemaName);
        await metaStorage.links.getAsync(relation);
        
        collection.addLinks({
            [String(propertyKey)]: {
                collection: relatedCollection,
                inversedBy: field,
            },
        });
    }
});
