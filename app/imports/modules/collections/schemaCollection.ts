// import {Mongo} from "meteor/mongo";
//
// import {Link, Mutation, Query, KeysMatching} from "./types";
//
// export class SchemaCollection<T> extends Mongo.Collection<Mutation<T>, Query<T>> {
//     getLink<V extends KeysMatching<T, Link>>(
//         objectorId: Grapher.ObjectOrId<V>,
//         name: V
//     ): Grapher.Link<Mutation<T>, Query<Query<T>[V]>> {
//         return super.getLink(objectorId, name as string);
//     }
//
//
// }
