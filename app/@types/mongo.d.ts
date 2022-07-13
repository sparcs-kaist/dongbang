/// <reference path="../node_modules/@types/meteor/mongo.d.ts" />

declare module "meteor/mongo" {
    import {Grapher} from "meteor/cultofcoders:grapher";
    
    export module Mongo {
        interface Collection<T, U = T> extends CollectionStatic {
            _name: string;
            createQuery: Grapher.CreateQuery<T, U> | Grapher.CreateNamedQuery<T, U>;
            addLinks<T>(links: {[key: string]: Grapher.LinkOptions<T>}): void;
            expose(config?: Grapher.ExposeConfig): void;
            getLink(objectOrId: Grapher.ObjectOrId<any>, name: keyof any): Grapher.Link<T, any>;
        }
    }
}
