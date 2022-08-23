import { collections } from "../../imports/collections";

export const deviceStatus = (() => {
    const cache = [];

    const change = (devices: string[]) => {
        collections.devices.find({ deviceId: { $in: devices } });
        // .forEach((device) => {});
    };

    return { change };
})();
