declare module "meteor/meteor" {
    module Meteor {
        function loginAsAdmin(password: string, callback?: () => void): void;
    }
}

declare module "*.module.css";
