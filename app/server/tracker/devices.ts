import { collections } from "/imports/collections";

export const deviceStatus = (() => {
    const change = Meteor.bindEnvironment((devices: string[]) => {
        collections.users.update(
            { deviceId: { $in: devices } },
            { $set: { isActive: true } },
            { multi: true },
        );

        collections.users.update(
            { deviceId: { $exists: true, $nin: devices } },
            { $set: { isActive: false } },
            { multi: true },
        );
    });

    return { change };
})();
