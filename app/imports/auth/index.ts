import {Meteor} from "meteor/meteor";

if (Meteor.isServer) {
    require("./server");
} else {
    require("./client");
}
