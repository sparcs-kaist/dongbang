import {Meteor} from 'meteor/meteor';

import "/imports/db";
import "/imports/api/publications";
import "/imports/api/methods"

import "./sso/handler";
import {UserStatus} from "/imports/db/users";

import "./dev/initTestAccounts";

import {userQuery} from "/imports/api/publications/members";
import {sessionQuery} from "/imports/api/publications/sessions";

userQuery.expose()
sessionQuery.expose()

// import {initialize} from "/imports/lib/addValidator";

Meteor.startup(() => {
    // initialize();
    // Meteor.users.addSchema("qwerqwer")
    // addValidator(Meteor.users);
    // try {
    //     Meteor.users.insert({
    //         name: "관aaa리자",
    //         nickname: "asdf",
    //         status: UserStatus.OFFLINE
    //     })
    // } catch (e) {
    //     console.log(e);
    // }
    //
    // const user = Meteor.users.findOne({nickname: "asdf"}, {fields: {_id: 1}});
    // console.log(user?._id);
    //
});


