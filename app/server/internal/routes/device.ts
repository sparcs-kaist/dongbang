import express from "express";
import {DevicesCollection} from "/imports/db/devices";

const router = express.Router();

router.get("/:mac", (req, res) => {
    DevicesCollection.findOne({macAddress: req.params.mac});
    
    res.json({
        hello: req.params.mac
    })
});

router.post("/", (req, res) => {

});

router.delete("/:mac", (req, res) => {
    
    res.status(204).send();
});

export default {router};
