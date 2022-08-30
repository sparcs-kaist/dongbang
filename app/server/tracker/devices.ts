import { collections } from "/imports/collections";

export const deviceStatus = (() => {
    const change = Meteor.bindEnvironment((devices: string[]) => {
        console.log(devices);
        const entered = collections.users.update(
            { deviceId: { $in: devices } },
            { $set: { isActive: true } },
            { multi: true },
        );

        const exited = collections.users.update(
            { deviceId: { $nin: devices } },
            { $set: { isActive: false } },
            { multi: true },
        );
        console.log(entered, exited);
    });

    return { change };
})();
