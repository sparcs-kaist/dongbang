import { collections } from "/imports/collections";

export const deviceStatus = (() => {
    const cache = [];

    const change = Meteor.bindEnvironment((devices: string[]) => {
        console.log(devices);

        collections.users.update(
            { deviceId: { $in: devices } },
            { $set: { isActive: true } },
        );

        collections.users.update(
            { deviceId: { $ne: undefined, $nin: devices } },
            { $set: { isActive: false } },
        );
    });

    return { change };
})();
