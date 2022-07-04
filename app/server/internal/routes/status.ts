import {Meteor} from "meteor/meteor";

import express from "express";
import {DevicesCollection} from "/imports/db/devices";

const router = express.Router();

interface ChangeStatusQuery {
    entered: string[];
    exited: string[];
}

router.post("/", (req, res) => {
    const query = req.body as ChangeStatusQuery;
    console.log(query);
    
    query.entered.forEach(macAddress => changeStatus(macAddress, true));
    query.exited.forEach(macAddress => changeStatus(macAddress, false));

    res.status(204).send();
});


const changeStatus = Meteor.bindEnvironment((macAddress: string, isActive: boolean) => {
    const userId = DevicesCollection.findOne({macAddress})?.userId;
    
    if (userId) {
        Meteor.users.update(userId, {
            $set: {isActive},
        });
    }
});

export default {router};
