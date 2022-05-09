import {Meteor} from "meteor/meteor";
import SimpleSchema from "simpl-schema";


const Options = (...values: string[]) =>
    new RegExp(`^${values.map(v => `(${v})`).join("|")}$`);


export enum UserStatus {

}

export interface ExtendUser {
    nickname: string;
    
}

const userSchema = new SimpleSchema({
    username: String,
    qwer: Options("aaa", "asdf", "sdddf"),
})

Meteor.users.attachSchema(userSchema);


