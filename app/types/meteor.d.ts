/// <reference path="../node_modules/@types/meteor/meteor.d.ts" />
//// <reference path="../node_modules/types/meteor-mdg-validated-method/index.d.ts" />

import {User as UserExtend} from "/imports/collections/users";
import {Query} from "/imports/modules/collections/types";

declare module "meteor/meteor" {
    module Meteor {
        // function loginAsAdmin(password: string, callback?: () => void): void;
        
        function loginAsLDAP(username: string, password: string, callback?: (error: Meteor.Error) => void): void;
        
        interface User extends Query<UserExtend> {}
    }
}

