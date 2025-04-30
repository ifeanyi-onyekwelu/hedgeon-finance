import express from "express";
import {
    createInvestment,
    reinvestEarnings,
    getUserInvestments,
    getInvestmentById,
} from "../controllers/investment.controller";

const router = express.Router();

router.post("/", createInvestment);
router.post("/reinvest", reinvestEarnings);
router.get("/", getUserInvestments);
router.get("/:id", getInvestmentById);

export default router;