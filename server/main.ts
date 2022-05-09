import {Meteor} from 'meteor/meteor';

import "/imports/db";
import "/imports/api/publications";

import "./sso/handler";

// import {initialize} from "/imports/lib/addValidator";

Meteor.startup(() => {
    // initialize();
    // Meteor.users.addSchema("qwerqwer")
    // addValidator(Meteor.users);
    try {
        Meteor.users.insert({username: "sdfff", qwer: "aaa"})
    } catch (e) {
        console.log(e);
    }
    
});


