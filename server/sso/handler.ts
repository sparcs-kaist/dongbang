import {Accounts} from "meteor/accounts-base";
import {Meteor} from "meteor/meteor";

Accounts.registerLoginHandler("test", function (loginRequest) {
    if (!loginRequest.test) return;
    
    const user = Meteor.users.findOne(
        {username: loginRequest.username},
        {fields: {_id: 1}},
    )
    
    if (!user) return;
    
    return {userId: user._id}
});
