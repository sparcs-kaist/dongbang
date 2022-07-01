import {Meteor} from "meteor/meteor";
import {initApp} from "./app";

if (Meteor.isServer) {
    initApp();
}
