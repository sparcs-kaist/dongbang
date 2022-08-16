import "meteor/meteor";

// import { User as UserExtend } from "/imports/collections/users";
// import { Query } from "/imports/utils/collections/types";

declare module "meteor/meteor" {
    namespace Meteor {
        // function loginAsAdmin(password: string, callback?: () => void): void;

        function loginAsLDAP(
            username: string,
            password: string,
            callback?: (error: Meteor.Error) => void,
        ): void;

        // type User = Query<UserExtend>;
    }
}
