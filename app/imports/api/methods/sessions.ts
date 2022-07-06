import {Meteor} from "meteor/meteor";
import {ValidatedMethod} from "meteor/mdg:validated-method";
import {Location, SessionsCollection, Session} from "/imports/collections/sessions";
import SimpleSchema from "simpl-schema";
import {Enum, Optional} from "/imports/custom/simpl-schema";



function authenticate(options: any) {
    // console.log(this.userId)
    const run = options.run;
    
    options.run = function (...args: any[]) {
        console.log(this.userId);
        if (!this.userId) throw new Meteor.Error("qwer")
        
        run.call(this, ...args);
        
        
    }
    
    return options
}

function cleanup(options: any) {
    const run = options.run;
    
    options.run = function (...args: any[]) {
        const sessionId = Meteor.users
            .findOne(this.userId, {fields: {sessionId: 1}})
            ?.sessionId;
        
        const res = run.call(this, ...args);
        
        if (!sessionId) return res;
        
        const memberCount = SessionsCollection
            .getLink<Meteor.User>(sessionId, "members")
            .find()
            .count();
        
        if (memberCount === 0) {
            SessionsCollection.remove(sessionId);
        }
        
        return res;
    }
    
    return options
}

function active (options: any) {
    const run = options.run;
    
    options.run = function (...args: any[]) {
        const res = run.call(this, ...args);
        
        Meteor.users.update(this.userId, {
            $set: {isActive: true}
        });
        
        return res;
    }
    
    return options
}



type StartSession = (session: {
    name: string;
    location?: Location;
}) => void;

export const startSession = new ValidatedMethod<string, StartSession>({
    name: "session.start",
    mixins: [cleanup, active],
    validate: new SimpleSchema({
        name: {
            type: String,
            min: 1,
            max: 50,
        },
        location: Optional(Enum(Location)),
    }).validator(),
    run(session) {
        if (!this.userId) {
            throw new Meteor.Error("Not authorized.");
        }
        //
        // const currentSession = Meteor.users
        //     .getLink<Session>(this.userId, "session")
        //     .fetch();
        
        // if (currentSession) {
        //     throw new Meteor.Error("Leave current session first to create new session")
        // }
        
        const sessionId = SessionsCollection.insert({
            name: session.name,
            location: session.location,
            creatorId: this.userId,
        });
        
        SessionsCollection
            .getLink<Meteor.User>(sessionId, "members")
            .set(this.userId);
    }
});


export const endSession = new ValidatedMethod<string, () => void>({
    name: "session.end",
    validate: v => {if (v !== undefined) throw new Error()},
    run() {
        if (!this.userId) {
            throw new Meteor.Error("Not authorized.");
        }
        
        const currentSession = Meteor.users
            .getLink<Session>(this.userId, "session")
            .fetch();
        
        if (currentSession.creatorId !== this.userId) {
            throw new Meteor.Error("A session can be ended only by its creator")
        }
        
        SessionsCollection.remove(currentSession._id);
    }
});

type JoinSession = (session: {sessionId: string}) => void;

export const joinSession = new ValidatedMethod<string, JoinSession>({
    name: "session.join",
    mixins: [cleanup, active],
    validate: new SimpleSchema({
        sessionId: String,
    }).validator({clean: true, trimStrings: true}),
    run({sessionId}) {
        if (!this.userId) {
            throw new Meteor.Error("Not authorized.");
        }
        
        SessionsCollection
            .getLink<Meteor.User>(sessionId, "members")
            .set(this.userId);
    }
});

export const leaveSession = new ValidatedMethod<string, () => void>({
    name: "session.leave",
    mixins: [cleanup],
    validate: null,
    run() {
        if (!this.userId) {
            throw new Meteor.Error("Not authorized.");
        }
        
        // const sessionId = Meteor.users
        //     .findOne(this.userId, {fields: {sessionId: 1}})
        //     ?.sessionId;
        //
        // if (!sessionId) {
        //     throw new Meteor.Error("Not in session")
        // }
        
        Meteor.users
            .getLink<Session>(this.userId, "session")
            .unset();
        
        // const memberCount = SessionCollection
        //     .getLink<Meteor.User>(sessionId, "members")
        //     .find()
        //     .count();
        
        // if (memberCount === 0) {
        //     SessionCollection.remove(sessionId);
        // }
    }
});
