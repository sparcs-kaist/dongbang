import SimpleSchema from "simpl-schema";
import { ValidatedMethod } from "meteor/mdg:validated-method";
import { Meteor } from "meteor/meteor";
import { collections } from "../../collections";

type UpdateStatusMethod = (status: {
    isActive?: boolean;
    statusMsg?: string;
}) => void;

export const updateStatus = new ValidatedMethod<string, UpdateStatusMethod>({
    name: "members.updateStatus",
    validate: new SimpleSchema({
        isActive: Boolean,
        statusMsg: String,
    }, {
        requiredByDefault: false,
    }).validator(),
    run (status) {
        if (!this.userId) {
            throw new Meteor.Error("Not authorized.");
        }
        
        collections.users.update(this.userId, {
            $set: { ...status },
        });
        
        if (!status.isActive) {
            collections.users
                .getLink(this.userId, "session")
                .unset();
        }
    },
});
