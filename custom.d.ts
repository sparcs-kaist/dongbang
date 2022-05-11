/// <reference path="node_modules/@types/meteor-mdg-validated-method/index.d.ts" />

import SimpleSchema from "simpl-schema";
import {ExtendUser} from "/imports/db/users";


// type Validator<T> = (value: any) => boolean;
// type Schema<T> = any

declare module "meteor/meteor" {
    module Meteor {
        function loginAsAdmin(password: string, callback?: () => void): void;
        
        function loginAsTestAccount(username: string, callback?: () => void): void;
        
        interface User extends ExtendUser {
        }
    }
}


declare module "meteor/mongo" {
    module Mongo {
        // type QueryBody<T> = Mongo.FieldSpecifier & {
        //     $options: Omit<Mongo.Options<T>, 'limit'>
        // }
        type QueryBody<T> = any;
        
        interface QueryOptions {
        
        }
        
        type CreateQuery<T, U> = (
            body?: QueryBody<T>, options?: QueryOptions
        ) => Mongo.Cursor<T, U>;
        
        type CreateNamedQuery<T, U> = (
            name: string, body?: QueryBody<T>, options?: QueryOptions
        ) => Mongo.Cursor<T, U>;
        
        interface ExposeConfig {
            firewall?(filters: any, options: any, userId: string): void;
            publication?: boolean;
            method?: boolean;
            blocking?: boolean;
            maxLimit?: number;
            maxDepth?: number;
            restrictedFields?: string[];
            restrictLinks?: string[];
        }
        
        
        interface Collection<T, U = T> extends CollectionStatic {
            // addSchema: (schema: Schema<T>) => void;
            schema: SimpleSchema;
            
            attachSchema(schema: SimpleSchema): void;
            
            // createQuery: (...args: QueryProps) => Mongo.Cursor<T, T>;
            createQuery: CreateQuery<T, U> | CreateNamedQuery<T, U>;
            
            expose(config?: ExposeConfig): any;
        }
    }
}




