import express from "express";
import {
    createInvestment,
    reinvestEarnings,
} from "../controllers/investment.controller";

const router = express.Router();

router.post("/", createInvestment);
router.post("/reinvest", reinvestEarnings);

export default router;