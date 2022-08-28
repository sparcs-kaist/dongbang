import { collections } from "/imports/collections";

export const deviceStatus = (() => {
    let cache: string;

    const change = Meteor.bindEnvironment((devices: string[]) => {
        console.log(devices);
        if (cache === JSON.stringify(devices)) return;

        collections.users.update(
            { deviceId: { $in: devices } },
            { $set: { isActive: true } },
        );

        collections.users.update(
            { deviceId: { $ne: undefined, $nin: devices } },
            { $set: { isActive: false } },
        );

        cache = JSON.stringify(devices);
    });

    return { change };
})();
