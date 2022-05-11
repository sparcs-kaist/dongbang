import SimpleSchema from "simpl-schema";
import {ValidatedMethod} from "meteor/mdg:validated-method";
import {Enum} from "/imports/custom/simpl-schema";
import {UserStatus} from "/imports/db/users";


type UpdateStatusMethod = (status: {
    type?: UserStatus;
    message?: string;
}) => void;

export const updateStatus = new ValidatedMethod<string, UpdateStatusMethod>({
    name: "members.updateStatus",
    validate: new SimpleSchema({
        type: Enum(UserStatus),
        message: String,
    }, {
        requiredByDefault: false,
    }).validator(),
    run(status) {
        if (!this.userId) {
            throw new Meteor.Error('Not authorized.');
        }
        
        Meteor.users.update(this.userId, {
            $set: {status}
        });
    }
});
