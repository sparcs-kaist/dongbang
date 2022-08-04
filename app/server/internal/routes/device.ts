import {Router} from "express";
import { collections } from "../../../imports/collections";

const router = Router();

router.get("/:mac", (req, res) => {
    const device = collections.devices.findOne({macAddress: req.params.mac});
    
    res.json({
        registered: !!device,
    });
});


export default {router};
