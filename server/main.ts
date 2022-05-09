import {Meteor} from 'meteor/meteor';

import "/imports/api/publications";
import "./sso/handler";

import {initialize} from "/imports/lib/addValidator";

Meteor.startup(() => {
    initialize();
    Meteor.users.addSchema("qwerqwer")
    // addValidator(Meteor.users);
    // Meteor.users.insert({username: "ffffdd", qwer: "dddd"})
    
});


