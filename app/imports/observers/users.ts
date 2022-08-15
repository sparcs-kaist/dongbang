import { collections } from "../collections";

collections.users.find({}, { fields: { sessionId: 1 } }).observe({
    changed(curr, prev) {
        curr.sessionId
            ? // Update `isActive` to true when user joins a session
              !prev.sessionId &&
              collections.users.update(curr, {
                  $set: { isActive: true },
              })
            : // Cleanup an empty session
              prev.sessionId &&
              collections.sessions
                  .getLink(prev.sessionId, "members")
                  .find()
                  .count() === 0 &&
              collections.sessions.remove(prev.sessionId);
    },
});
