/// <reference path="../node_modules/@types/meteor/meteor.d.ts" />
/// <reference path="../node_modules/@types/meteor-mdg-validated-method/index.d.ts" />


import {UserExtension as UserExtend} from "/imports/db/users";


declare module "meteor/meteor" {
    module Meteor {
        // function loginAsAdmin(password: string, callback?: () => void): void;
        
        function loginAsLDAP(username: string, password: string, callback?: (error: Meteor.Error) => void): void;
        
        interface User extends UserExtend {}
    }
}


