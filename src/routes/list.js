import express from "express";
const router = express.Router();

router.get("/", async (req, res) => {
    let validated = req.query.validated ? req.query.validated : false;

    if(validated) {
        // TODO (axel): Respond with already validated orders. (validated = signed)
    } else {
        // TODO (axel): Respond with non-validated oreders.
    }
});

export default router;