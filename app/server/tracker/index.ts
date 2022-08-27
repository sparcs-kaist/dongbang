import { Meteor } from "meteor/meteor";
import { init } from "./connection";

Meteor.startup(() => init());
// init();
