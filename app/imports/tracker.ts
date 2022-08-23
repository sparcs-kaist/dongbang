interface Status {
    error: TrackerError | null;
}

export interface TrackerError {
    message: string;
}

export const trackerStatus: Status = {
    error: null,
};
