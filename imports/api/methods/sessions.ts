import {Meteor} from "meteor/meteor";
import {ValidatedMethod} from "meteor/mdg:validated-method";
import {Location, SessionCollection} from "/imports/db/sessions";
import SimpleSchema from "simpl-schema";
import {Enum, Optional} from "/imports/custom/simpl-schema";

type CreateSessionMethod = (session: {
    name: string;
    location?: Location;
}) => void;

export const createSession = new ValidatedMethod<string, CreateSessionMethod>({
    name: "session.create",
    validate: new SimpleSchema({
        name: String,
        location: Optional(Enum(Location)),
    }).validator(),
    run(session) {
        if (!this.userId) {
            throw new Meteor.Error("Not authorized.");
        }
        
        const currentSession = Meteor.users
            .getLink<Meteor.User>(this.userId, "session")
            .fetch();
  
        if (currentSession) {
            throw new Meteor.Error("Leave current session first to create new session")
        }
        
        const sessionId = SessionCollection.insert({
            name: session.name,
            location: session.location,
            creatorId: this.userId,
        });
        
        SessionCollection
            .getLink<Meteor.User>(sessionId, "members")
            .set(this.userId);
    }
})
