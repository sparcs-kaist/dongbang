import { collections } from "/imports/collections";

export const deviceStatus = (() => {
    const cache = [];

    const change = Meteor.bindEnvironment((devices: string[]) => {
        console.log(devices);
        // collections.devices
        //     .find({ deviceId: { $in: devices } }, { fields: { userId: 1 } })
        //     .forEach((userId) => {
        //         console.log(userId);
        //     });
        // .forEach((device) => {});

        // collections.devices.find({ deviceId: { $nin: devices } });
    });

    return { change };
})();
