import {Meteor} from "meteor/meteor";
import {ValidatedMethod} from "meteor/mdg:validated-method";
import SimpleSchema from "simpl-schema";
import {DevicesCollection} from "/imports/db/device";

type RegisterDevice = (device: {
    macAddress: string;
}) => void;

export const registerDevice = new ValidatedMethod<string, RegisterDevice>({
    name: "device.register",
    validate: new SimpleSchema({
        macAddress: String
    }).validator(),
    run(device) {
        if (!this.userId) {
            throw new Meteor.Error("Not authorized");
        }
        DevicesCollection.insert({
            macAddress: device.macAddress,
            userId: this.userId,
        });
    }
});
