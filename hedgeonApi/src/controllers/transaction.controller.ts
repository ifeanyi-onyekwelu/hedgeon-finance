import asyncHandler from "express-async-handler";
import { Request, Response } from "../utils/Types";
import Transaction from "../models/transaction.model";
import { getUserById } from "../services/user.service";
import { logData } from "../utils/logger";
import { NotFoundError } from "../utils/errors";

/**
 * Get all transactions for the current user
 */
export const getUserTransactions = asyncHandler(async (req: Request, res: Response) => {
    const user = await getUserById(req.session.user.id);
    if (!user) throw new NotFoundError("User not found");

    // Get user transactions with investment and plan populated
    const transactions = await Transaction.find({ userId: user._id })
        .sort({ createdAt: -1 })
        .populate({
            path: "investment",
            populate: {
                path: "plan.planId", // populate the plan inside investment
            }
        });

    logData(res, 200, { success: true, transactions });
});

/**
 * Get a specific transaction by ID
 */
export const getTransactionById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const transaction = await Transaction.findById(id);
    if (!transaction) throw new NotFoundError("Transaction not found");

    logData(res, 200, { success: true, transaction });
});
