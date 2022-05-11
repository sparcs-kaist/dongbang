import SimpleSchema from "simpl-schema";
import {ValidatedMethod} from "meteor/mdg:validated-method";
import {SessionCollection} from "/imports/db/sessions";


export const createSession = new ValidatedMethod({
    name: "session.create",
    validate: arg => undefined,
    run(session) {
        if (!this.userId) {
            throw new Meteor.Error("Not authorized.");
        }
        
        const user = Meteor.users.findOne(this.userId, {fields: {sessionId: 1}})
        if (user.sessionId) {
            throw new Meteor.Error("Leave current session first to create session")
        }
        
        const sessionId = SessionCollection.insert({
            name: session.name,
            location: session.location,
            creatorId: this.userId,
        });
        
        console.log(sessionId);
        
        //
        const membersLink = SessionCollection.getLink(sessionId, "members");
        console.log(membersLink)
        //
        
        // const user = Meteor.users.findOne(this.userId);
        
        membersLink.set(this.userId);
        
    }
})
