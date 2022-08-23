import { trackerStatus, TrackerError } from "/imports/tracker";

export const status = {
    setError(error: TrackerError | null) {
        trackerStatus.error = error;
    },

    disconnect() {
        this.setError({ message: "Tracker offline" });
    },

    connect() {
        this.setError(null);
    },
};
