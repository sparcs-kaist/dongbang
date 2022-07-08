import {Meteor} from "meteor/meteor";
// import SimpleSchema from "simpl-schema";
// import {Optional} from "/imports/custom/simpl-schema";

import {Session, SessionsCollection} from "/imports/collections/sessions";
// import Collection = Mongo.Collection;
import {IsBoolean, IsObject, IsOptional, IsString} from "class-validator";
import {Collection} from "/imports/modules/collections/decorators/collection";
import {LinkOne} from "/imports/modules/collections/decorators/links";



export interface UserExtension {
    _id?: string;
    name: string;
    username: string;
    isActive: boolean;
    statusMsg?: string;
    // status: {
    //     type: UserStatus;
    //     message?: string;
    // };
    sessionId?: string;
    session?: Session;
}


@Collection(Meteor.users)
export class User {
    @IsString()
    name: string;

    @IsString()
    username: string;

    @IsBoolean()
    isActive: boolean;

    @IsOptional() @IsString()
    statusMsg?: string;

    @IsOptional() @IsObject()
    services?: object;
    
    @LinkOne(Session)
    session: Session;
}

// const col = User.get();

// Meteor.users.schema = new SimpleSchema({
//     name: String,
//     username: String,
//     isActive: Boolean,
//     statusMsg: Optional(String),
//     // status: new SimpleSchema({
//     //     type: Enum(UserStatus),
//     //     message: Optional(String),
//     // }),
//     services: {
//         type: Object,
//         optional: true,
//         blackbox: true,
//     },
//     sessionId: Optional(String),
// });

// if (Meteor.isServer) {
//     SessionsCollection.rawDatabase().command({
//         collMod: Meteor.users.rawCollection().collectionName,
//         validator: {
//             $jsonSchema: {
//                 properties: {
//                     name: {type: 'string'},
//                     username: {type: 'string'},
//                     isActive: {type: 'boolean'},
//                     statusMsg: {type: 'string'},
//                     services: {type: 'object'},
//                 },
//                 type: 'object',
//                 required: ['name', 'username', 'isActive']
//             }
//         }
//     }).then(console.log)
// }


// Meteor.users.attachSchema(Meteor.users.schema);

// Meteor.users.addLinks({
//     "session": {
//         type: "one",
//         collection: SessionsCollection,
//         field: "sessionId"
//     }
// });
//

