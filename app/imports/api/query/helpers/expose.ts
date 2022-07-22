import { Meteor } from "meteor/meteor";
import { Grapher } from "meteor/cultofcoders:grapher";

export const expose = (query: Grapher.Query<any, any>) => {
    if (Meteor.isServer) {
        Meteor.startup(() => query.expose());
    }
};
