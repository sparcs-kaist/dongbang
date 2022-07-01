import express from "express";

const router = express.Router();

// router.use((req, res, next) => {
//     next();
// });

router.get("/test", (req, res) => {
    res.json({
        hello: "world"
    })
});

export default {router};
