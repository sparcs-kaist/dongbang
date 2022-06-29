import {Meteor} from "meteor/meteor";

import "./methods";
import "./query";

if (Meteor.isServer) {
    import("./internal");
}
