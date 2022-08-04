import { Accounts } from "meteor/accounts-base";
import { Meteor } from "meteor/meteor";

import { Client } from "ldapts";
import { getMemberData } from "/imports/lib/memvers";
import { asyncToSync } from "/imports/custom/asyncToSync";
import { collections } from "../collections";

if (Meteor.isServer) {
    Accounts.registerLoginHandler("ldap", function (loginRequest) {
        if (loginRequest.type !== "ldap") return;
        
        const username = authenticateByLDAP(
            loginRequest.username,
            loginRequest.password,
        );
        
        if (!username) {
            throw new Meteor.Error("Wrong credentials");
        }
        
        const userId = Meteor.users.findOne(
            { username: username },
            { fields: { _id: 1 } },
        )?._id || initializeUser(username);
        
        return { userId };
    });
}

const client = new Client({
    url: "ldap://ldap.sparcs.org",
    timeout: 0,
    connectTimeout: 2000,
    strictDN: true,
});

const authenticateByLDAP = asyncToSync(async (
    username: string,
    password: string,
): Promise<string | null> => {
    try {
        await client.bind(
            `uid=${sanitize(username)},ou=People,dc=sparcs,dc=org`,
            password,
        );
        await client.unbind();
    } catch {
        return null;
    }
    
    return username;
});

const sanitize = (string: string): string => {
    if (!/^\w*$/.test(string)) throw Error("Disallowed character");
    return string;
};

const initializeUser = (username: string): string => {
    const userData = getMemberData(username);
    return collections.users.insert({
        name: userData.name,
        username: username,
        isActive: false,
    });
};

