import {Router} from "express";
import {DevicesCollection} from "../../../imports/collections/devices";

const router = Router();

router.get("/:mac", (req, res) => {
    const device = DevicesCollection.findOne({macAddress: req.params.mac});
    
    res.json({
        registered: !!device,
    });
});


export default {router};
