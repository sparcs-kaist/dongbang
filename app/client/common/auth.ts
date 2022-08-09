import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";

Meteor.loginAsLDAP = function (username, password, callback) {
    Accounts.callLoginMethod({
        methodArguments: [
            {
                type: "ldap",
                username: username,
                password: password,
            },
        ],
        userCallback: callback,
    });
};
