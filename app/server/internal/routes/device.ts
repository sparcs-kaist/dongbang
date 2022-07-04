import express from "express";
import {DevicesCollection} from "/imports/db/devices";

const router = express.Router();

router.get("/:mac", (req, res) => {
    const device = DevicesCollection.findOne({macAddress: req.params.mac});
    
    res.json({
        registered: !!device,
    });
});


export default {router};
