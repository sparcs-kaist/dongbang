import {Meteor} from "meteor/meteor";

import {Mongo} from "meteor/mongo";
import SimpleSchema from "simpl-schema";
import {Enum, Optional} from "/imports/custom/simpl-schema";
import {Collection} from "/imports/modules/collections/decorators/collection";
import {IsEnum, IsOptional, IsString} from "class-validator";
import {InverseLink, LinkOne} from "/imports/modules/collections/decorators/links";
import {User} from "/imports/collections/users";
import {getCollection} from "/imports/modules/collections/schema";

export enum Location {
    A_SITE = "A SITE",
    B_SITE = "B SITE",
}
//
// export const LOCATION_NAME = {
//     [Location.A_SITE]: "A SITE",
//     [Location.B_SITE]: "B SITE",
// } as const;
//
// interface SessionCreate {
//     name: string;
//     location?: Location;
//     creatorId: string;
// }
//
// export interface Session extends SessionCreate {
//     _id: string;
//     members: Meteor.User[];
// }

@Collection()
export class Session {
    @IsString()
    name: string;
    
    @IsEnum(Location) @IsOptional()
    location?: Location;
    
    // @LinkOne(User)
    // creator: User;
    
    @InverseLink("User.session")
    members: User[];
}


// export const SessionsCollection = new Mongo.Collection<SessionCreate, Session>("sessions");
export const SessionsCollection = getCollection(Session);

//
// SessionsCollection.schema = new SimpleSchema({
//     name: String,
//     location: Optional(Enum(Location)),
//     creatorId: String,
// });
//
// SessionsCollection.attachSchema(SessionsCollection.schema);
//
// SessionsCollection.addLinks({
//     "members": {
//         collection: Meteor.users,
//         inversedBy: "session",
//     }
// });
