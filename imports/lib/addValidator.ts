import {Mongo} from "meteor/mongo";
import Ajv, {Schema} from "ajv";
import {Type as T} from "@sinclair/typebox";

export type addSchema<T> = (schema: T) => void;

export const ValidationError = new Error("Schema validation error");

export const initialize = () => {
    ["insert", "update"].forEach((methodName) => {
        const _super = Mongo.Collection.prototype[methodName];
        
        Mongo.Collection.prototype[methodName] = function (...args: any) {
            if (!this.validator(args[0]))
            
            _super.apply(this, args)
        }
    })
    
    
    Mongo.Collection.prototype["validator"] = () => true;
    
    Mongo.Collection.prototype["addSchema"] = function (schema: Schema) {
        this.validator = schemaValidator(schema);
    }
}

const ajv = new Ajv();

const schemaValidator = (schema: Schema) => (obj: any) => ajv.validate(schema, obj);

const memberSchema: Schema = {
    properties: {
        name: {type: "string"},
        nickname: {type: "string"},
    },
    optionalProperties: {
        _id: {type: "string"}
    },
} as const;

enum Status {
    ASDF
}

const Member = T.Object({
    id_: T.String(),
    name: T.String(),
    nickname: T.String(),
    status: T.Enum(Status)
})

const asdf = (a: Schema) => {

}

asdf(Member);

// export const addValidator = (collection: Mongo.Collection<any>) => {
//     const _super = collection.insert;
//
//     collection.insert = function (...args) {
//         console.log("validator added");
//         return _super(...args);
//     }
//
//     // collection["addValidator"] = "a"
//
//     // for (const prop in _super) {
//     //     if (_super.hasOwnProperty(prop)) {
//     //         collection.insert[prop] = _super[prop]
//     //     }
//     // }
// }
