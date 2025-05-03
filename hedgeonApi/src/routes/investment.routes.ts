import express from "express";
import {
    createInvestment,
    reinvestEarnings,
    getUserInvestments,
    getInvestmentById,
    allocateProfit
} from "../controllers/investment.controller";
import multer from 'multer';

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() })

router.post("/", upload.single('screenshot'), createInvestment);
router.post("/reinvest", reinvestEarnings);
router.get("/", getUserInvestments);
router.get("/:id", getInvestmentById);
router.post("/allocate-profit", allocateProfit);

export default router;