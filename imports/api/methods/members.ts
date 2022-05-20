import SimpleSchema from "simpl-schema";
import {ValidatedMethod} from "meteor/mdg:validated-method";

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
    run(status) {
        if (!this.userId) {
            throw new Meteor.Error('Not authorized.');
        }
        
        Meteor.users.update(this.userId, {
            $set: {...status}
        });
    }
});
