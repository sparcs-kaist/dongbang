import {Accounts} from "meteor/accounts-base";
import {Meteor} from "meteor/meteor";

// Meteor.startup(() =>
//     Accounts.registerLoginHandler("sparcssso", function (loginRequest) {
//         console.log("asdf")
//         console.log(loginRequest);
//         if (!loginRequest.sparcssso) return;
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
// )
