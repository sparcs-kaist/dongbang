/// <reference path="../node_modules/@types/meteor/mongo.d.ts" />


import SimpleSchema from "simpl-schema";

declare module "meteor/mongo" {
    export module Mongo {
        type QueryBody<T> = any;
        
        interface QueryOptions {
        
        }
        
        export interface GraphQuery<T, U> extends Mongo.Cursor<T, U> {
            expose(): void;
            clone(): GraphQuery<T, U>;
            subscribe(): GraphQueryHandler;
        }
        
        export interface GraphQueryHandler {
            ready(): boolean;
        }
        
        type CreateQuery<T, U> = (
            body?: QueryBody<T>, options?: QueryOptions
        ) => GraphQuery<T, U>;
        
        type CreateNamedQuery<T, U> = (
            name: string, body?: QueryBody<T>, options?: QueryOptions
        ) => GraphQuery<T, U>;
        
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
        
        interface DirectLinkOptions<T> {
            type?: "one" | "many";
            collection: Partial<Collection<T>>;
            field: string;
        }
        
        interface InverseLinkOptions<T> {
            collection: Partial<Collection<T>>;
            inversedBy: string;
        }
        
        type LinkOptions<T> = DirectLinkOptions<T> | InverseLinkOptions<T>;
        
        type ObjectOrId<T> = string | Partial<T>
        
        interface Link<T, L> {
            find(filters?: any, options?: any): Link<T, L>;
            fetch(filters?: any, options?: any): L;
            count(): number;
            set(objectOrId: ObjectOrId<L>): void;
            unset(): void;
            add(objectOrIds: ObjectOrId<L> | ObjectOrId<L>[]): void;
            remove(objectOrIds: ObjectOrId<L> | ObjectOrId<L>[]): void;
        }
        
        interface Collection<T, U = T> extends CollectionStatic {
            // Methods injected by "aldeed:collection2"
            schema: SimpleSchema;
            attachSchema(schema: SimpleSchema): void;
            
            // Methods injected by "cultofcoders:grapher"
            createQuery: CreateQuery<T, U> | CreateNamedQuery<T, U>;
            addLinks<T>(links: {[key: string]: LinkOptions<T>}): void;
            expose(config?: ExposeConfig): void;
            getLink<L>(objectOrId: ObjectOrId<L>, name: string): Link<T, L>;
        }
    }
}
