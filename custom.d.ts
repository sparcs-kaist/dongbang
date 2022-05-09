declare module "*.module.css";

interface UserQwer {
    qwer?: string
}


// type Validator<T> = (value: any) => boolean;
type Schema<T> = any

declare module "meteor/meteor" {
    module Meteor {
        function loginAsAdmin(password: string, callback?: () => void): void;
        interface User extends UserQwer {}
    }
}

declare module "meteor/mongo" {
    module Mongo {
        interface Collection<T, U = T> extends CollectionStatic {
            addSchema: (schema: Schema<T>) => void;
        }
    }
}


