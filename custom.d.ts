import SimpleSchema from "simpl-schema";
import {ExtendAccount} from "/imports/db/accounts";

declare module "*.module.css";


// type Validator<T> = (value: any) => boolean;
// type Schema<T> = any

declare module "meteor/meteor" {
    module Meteor {
        function loginAsAdmin(password: string, callback?: () => void): void;
        interface User extends ExtendAccount {}
    }
}

declare module "meteor/mongo" {
    module Mongo {
        interface Collection<T, U = T> extends CollectionStatic {
            // addSchema: (schema: Schema<T>) => void;
            attachSchema: (schema: SimpleSchema) => void;
        }
    }
}


