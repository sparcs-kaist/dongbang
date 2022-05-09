import {Meteor} from 'meteor/meteor';

import "/imports/db";
import "/imports/api/publications";

import "./sso/handler";
import {UserStatus} from "/imports/db/users";

// import {initialize} from "/imports/lib/addValidator";

Meteor.startup(() => {
    // initialize();
    // Meteor.users.addSchema("qwerqwer")
    // addValidator(Meteor.users);
    try {
        Meteor.users.insert({
            name: "관aaa리자",
            nickname: "asdf",
            status: UserStatus.OFFLINE
        })
    } catch (e) {
        console.log(e);
    }
    
    const user = Meteor.users.findOne({nickname: "asdf"}, {fields: {_id: 1}});
    console.log(user?._id);
    
});


