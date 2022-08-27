import { Meteor } from "meteor/meteor";
import { TrackerError } from "./error";

export const fetchDeviceId = async (): Promise<string | null> => {
    const res = await fetch(Meteor.settings.public.trackerEndpoint);
    if (res.status !== 200) return null;

    const data = await res.json();

    if (data?.hello !== "dongbang") return null;

    if (data?.error) throw new TrackerError(data.error);
    return data?.deviceId ?? null;
};
