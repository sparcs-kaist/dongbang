import { Meteor } from "meteor/meteor";
import { ValidatedMethod } from "meteor/mdg:validated-method";
import SimpleSchema from "simpl-schema";

import { Location } from "../../collections/sessions";
import { collections } from "../../collections";
import { method } from "../../utils/methods";
import { IsEnum, IsNotEmpty, IsOptional, Length } from "class-validator";

function cleanup(options: any) {
    const run = options.run;

    options.run = function (...args: any[]) {
        const sessionId = collections.users.findOne(this.userId, {
            fields: { sessionId: 1 },
        })?.sessionId;

        const res = run.call(this, ...args);

        if (!sessionId) return res;

        const memberCount = collections.sessions
            .getLink(sessionId, "members")
            .find()
            .count();

        if (memberCount === 0) {
            collections.sessions.remove(sessionId);
        }

        return res;
    };

    return options;
}

function active(options: any) {
    const run = options.run;

    options.run = function (...args: any[]) {
        const res = run.call(this, ...args);

        Meteor.users.update(this.userId, {
            $set: { isActive: true },
        });

        return res;
    };

    return options;
}

class StartInput {
    @Length(1, 50)
    name: string;

    @IsEnum(Location)
    @IsOptional()
    location?: Location;
}

export const start = method("sessions.start", {
    input: StartInput,
    resolve(userId, input) {
        const sessionId = collections.sessions.insert({
            ...input,
            creatorId: userId,
        });

        collections.sessions.getLink(sessionId, "members").set(userId);
    },
});

export const end = method("sessions.end", {
    resolve(userId) {
        const session = collections.users.getLink(userId, "session").fetch();

        if (session.creatorId !== userId) {
            throw new Meteor.Error("Not authorized");
        }

        collections.sessions.remove(session._id);
    },
});

class JoinInput {
    @IsNotEmpty()
    sessionId: string;
}

export const join = method("sessions.join", {
    input: JoinInput,
    resolve(userId, input) {
        collections.sessions.getLink(input.sessionId, "members").set(userId);
    },
});

type JoinSession = (session: { sessionId: string }) => void;

export const joinSession = new ValidatedMethod<string, JoinSession>({
    name: "session.join",
    mixins: [cleanup, active],
    validate: new SimpleSchema({
        sessionId: String,
    }).validator({ clean: true, trimStrings: true }),
    run({ sessionId }) {
        if (!this.userId) {
            throw new Meteor.Error("Not authorized.");
        }

        collections.sessions.getLink(sessionId, "members").set(this.userId);
    },
});

export const leave = method("sessions.leave", {
    resolve(userId) {
        collections.users.getLink(userId, "session").unset();
    },
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

        collections.users.getLink(this.userId, "session").unset();

        // const memberCount = SessionCollection
        //     .getLink<Meteor.User>(sessionId, "members")
        //     .find()
        //     .count();

        // if (memberCount === 0) {
        //     SessionCollection.remove(sessionId);
        // }
    },
});
