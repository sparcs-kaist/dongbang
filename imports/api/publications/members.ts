import {Meteor} from "meteor/meteor";

Meteor.publish("members", function publishMembers() {


    return Meteor.users.find({});
})
