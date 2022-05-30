import {Meteor} from "meteor/meteor";
import {Mongo} from "meteor/mongo";

export const expose = (query: Mongo.GraphQuery<any, any>) => {
    if (Meteor.isServer) {
        Meteor.startup(() => query.expose());
    }
}
