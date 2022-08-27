interface Status {
    ipAddr: string | null;
    error: TrackerError | null;
}

export enum TrackerError {
    OFFLINE = "Tracker offline",
    LAN_ERROR = "Tracker LAN error",
    UNKNOWN = "Tracker unknown error",
}

export const tracker: Status = {
    ipAddr: null,
    error: null,
};
