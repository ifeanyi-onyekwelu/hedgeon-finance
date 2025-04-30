import express from "express";
import {
    getUserTransactions,
    getTransactionById,
} from "../controllers/transaction.controller";

const router = express.Router();

router.get("/", getUserTransactions);
router.get("/:id", getTransactionById)

export default router;