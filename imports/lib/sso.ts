import {Meteor} from "meteor/meteor";
import {Accounts} from "meteor/accounts-base";

// if (Meteor.isServer) {
//     Accounts.registerLoginHandler("login", function(loginRequest) {
//         console.log("asdf")
//
//         const userId = "test1";
//
//         const stampedToken = Accounts._generateStampedLoginToken();
//         const hashStampedToken = Accounts._hashStampedToken(stampedToken);
//         Meteor.users.update(userId, {
//             $push: {"services.resume.loginTokens": hashStampedToken}
//         })
//
//         return {
//             userId,
//             token: stampedToken.token
//         }
//     })
//
//     // Meteor.methods({
//     //     sparcssso() {
//     //         console.log("asdfasdf")
//     //
//     //         return {id: "test1"}
//     //     }
//     // })
// }

declare module "meteor/meteor" {
    module Meteor {
        function loginWithSparcsSSO(): void;
    }
}

Meteor.loginWithSparcsSSO = () => {
    console.log("qwer")
    Accounts.callLoginMethod({
        // methodName: "sparcssso",
        methodArguments: [{
            sparcssso: true
        }],
        userCallback: (asdf) => console.log(asdf),
    })
}

import {AccountsCommon} from "meteor/accounts-base"
