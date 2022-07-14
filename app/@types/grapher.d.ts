declare module "meteor/cultofcoders:grapher" {
    import {Mongo} from "meteor/mongo";
    export module Grapher {
        
        type QueryBody<T> = any;
        
        interface QueryOptions {
        
        }
        
        export interface Query<T, U> extends Mongo.Cursor<T, U> {
            expose(options?: {
                firewall?(userId: string, params: any): void,
                embody?: {
                    $filter?({filters, params}: { filters: any, params: any }): void
                },
            }): void;
            
            clone(options?: any): Query<T, U>;
            
            subscribe(): QueryHandler;
            
            fetchOne(): U | undefined;
        }
        
        interface QueryHandler {
            ready(): boolean;
        }
        
        type CreateQuery<T, U> = (
            body?: QueryBody<T>, options?: QueryOptions
        ) => Query<T, U>;
        
        type CreateNamedQuery<T, U> = (
            name: string, body?: QueryBody<T>, options?: QueryOptions
        ) => Query<T, U>;
        
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
            type: "one" | "many";
            collection: Partial<Mongo.SchemaCollection<T>>;
            field: string;
        }
        
        interface InverseLinkOptions<T> {
            collection: Partial<Mongo.SchemaCollection<T>>;
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
    }
}
