import SimpleSchema from "simpl-schema";
import {ValidatedMethod} from "meteor/mdg:validated-method";
import {Enum} from "/imports/custom/simpl-schema";
import {UserStatus} from "/imports/db/users";


type UpdateStatusMethod = (arg: {
    type?: UserStatus;
    message?: string;
}) => void

export const updateStatus = new ValidatedMethod<string, UpdateStatusMethod>({
    name: "members.updateStatus",
    validate: new SimpleSchema({
        type: Enum(UserStatus),
        message: String,
    }, {
        requiredByDefault: false,
    }).validator(),
    run(status) {
        console.log("qwerqwer")
        
        if (!this.userId) {
            throw new Meteor.Error('Not authorized.');
        }
        
        const user = Meteor.users.findOne(
            {_id: this.userId},
            {fields: {status: 1}}
        );
        console.log(user)
        //
        // if (!this.userId) {
        //     throw new Meteor.Error('No such user');
        // }
        
        console.log(this.userId)
        
        
        Meteor.users.update(this.userId, {
            $set: {status}
        });
        
        
    }
})

// Meteor.methods({
//   [updateStatus.name]: function (args) {
//     updateStatus.validate.call(this, args);
//     updateStatus.run.call(this, args);
//   }
// })
