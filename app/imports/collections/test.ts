import {Mongo} from "meteor/mongo";

import {IsString} from "class-validator";
import {Collection} from "/imports/modules/collections/decorators/collection";
import {LinkOne} from "/imports/modules/collections/decorators/links";
import {Animal} from "/imports/collections/test2";
import {SessionsCollection} from "/imports/collections/sessions";

const OwnerCollection = new Mongo.Collection("Owner");

@Collection()
export class Sessions {
    @IsString()
    name: string;
    
    @LinkOne(Animal)
    pet: Animal;
}


