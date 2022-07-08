import {IsString} from "class-validator";
import {Collection} from "/imports/modules/collections/decorators/collection";
import {InverseLink} from "/imports/modules/collections/decorators/links";
import {sessions} from "/imports/collections/test";

@Collection()
export class Animal {
    @IsString()
    nickname: string;
    
    @InverseLink("Owner.pet")
    owner: sessions[];
}
