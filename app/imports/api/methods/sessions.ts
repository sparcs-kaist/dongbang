import { Meteor } from "meteor/meteor";

import { method } from "../../utils/methods";
import { collections } from "../../collections";
import { IsEnum, IsNotEmpty, IsOptional, Length } from "class-validator";
import { Location } from "../../collections/sessions";

class StartInput {
    @Length(1, 50)
    name: string;

    @IsEnum(Location)
    @IsOptional()
    location?: Location;
}

export const start = method("sessions.start", {
    input: StartInput,
    resolve({ userId }, input) {
        const sessionId = collections.sessions.insert({
            ...input,
            creatorId: userId,
        });

        collections.sessions.getLink(sessionId, "members").set(userId);
    },
});

export const end = method("sessions.end", {
    resolve({ userId }) {
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
    resolve({ userId }, input) {
        collections.sessions.getLink(input.sessionId, "members").set(userId);
    },
});

export const leave = method("sessions.leave", {
    resolve({ userId }) {
        collections.users.getLink(userId, "session").unset();
    },
});
