import express from "express";
import userModel from "../models/user.model";
import planModel from "../models/plan.model";

const router = express.Router();

// Cron route
router.post("/calculate-profit", async (req, res) => {
    try {
        res.status(200).send({
            success: true,
            message: "Profit calculated successfully!",
        });
    } catch (error) {
        console.error("Error in cron route:", error);
        res.status(500).send({ success: false, message: "An error occurred." });
    }
});

export default router;
