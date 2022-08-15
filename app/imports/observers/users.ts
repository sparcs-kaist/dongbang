import { collections } from "../collections";

collections.users.find({}, { fields: { sessionId: 1 } }).observe({
    changed(curr, prev) {
        if (curr.sessionId !== prev.sessionId) {
            // Update `isActive` to true when user joins a session
            curr.sessionId &&
                !prev.sessionId &&
                collections.users.update(curr, {
                    $set: { isActive: true },
                });

            // Cleanup an empty session
            prev.sessionId &&
                collections.sessions
                    .getLink(prev.sessionId, "members")
                    .find()
                    .count() === 0 &&
                collections.sessions.remove(prev.sessionId);
        }
    },
});
