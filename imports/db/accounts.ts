import {Meteor} from "meteor/meteor";
import SimpleSchema from "simpl-schema";


const Options = (...values: string[]) =>
    new RegExp(`^${values.map(v => `(${v})`).join("|")}$`);


export interface ExtendAccount {
    nickname: string;
    
}

const accountSchema = new SimpleSchema({
    username: String,
    qwer: Options("aaa", "asdf", "sdddf"),
})

Meteor.users.attachSchema(accountSchema);


