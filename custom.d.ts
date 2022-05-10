/// <reference path="node_modules/@types/meteor-mdg-validated-method/index.d.ts" />

import SimpleSchema from "simpl-schema";
import {ExtendUser} from "/imports/db/users";




// type Validator<T> = (value: any) => boolean;
// type Schema<T> = any

declare module "meteor/meteor" {
    module Meteor {
        function loginAsAdmin(password: string, callback?: () => void): void;
        function loginAsTestAccount(username: string, callback?: () => void): void;
        interface User extends ExtendUser {}
    }
}

declare module "meteor/mongo" {
    module Mongo {
        interface Collection<T, U = T> extends CollectionStatic {
            // addSchema: (schema: Schema<T>) => void;
            schema: SimpleSchema;
            attachSchema: (schema: SimpleSchema) => void;
        }
    }
}


