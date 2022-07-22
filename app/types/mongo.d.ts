/// <reference path="../node_modules/@types/meteor/mongo.d.ts" />

import * as Linkr from "/imports/modules/collections/types";
import {Grapher} from "meteor/cultofcoders:grapher";
declare module "meteor/mongo" {
    
    export module Mongo {
        interface Collection<T, U = T> extends CollectionStatic {
            _name: string;
            createQuery: Grapher.CreateQuery<T, U> | Grapher.CreateNamedQuery<T, U>;
            
            addLinks<T>(links: { [key: string]: Grapher.LinkOptions<T> }): void;
            
            expose(config?: Grapher.ExposeConfig): void;
            
            getLink(objectOrId: Grapher.ObjectOrId<any>, name: keyof any): Grapher.Link<T, any>;
        }
        
        export interface SchemaCollection<T> extends Collection<Linkr.Mutation<T>, Linkr.Query<T>> {
            getLink<V extends Linkr.KeysMatching<T, Linkr.Link>>(
                objectorId: Grapher.ObjectOrId<Linkr.RelatedQuery<T, V>>,
                name: V
            ): Grapher.Link<Linkr.Mutation<T>, Linkr.RelatedQuery<T, V>>;
        }
    }
}
