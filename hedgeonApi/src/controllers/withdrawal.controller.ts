import { Request, Response } from "../utils/Types";
import withdrawalModel from "../models/withdrawal.model";
import asynchHandler from "express-async-handler";
import { logData, logError } from "../utils/logger";
import { getUserById } from "../services/user.service";
import { BadRequestError } from "../utils/errors";

export const withdrawalHandler = asynchHandler(
    async (req: Request, res: Response) => {
        const { amount, currency, walletAddress } = req.body;

        // Get userdetails
        const user = await getUserById(req.session.user.id);

        // Validate that the user has sufficient funds for the withdrawal
        if (user.walletBalance < amount) {
            return logError(res, new BadRequestError("Insufficient wallet balance to withdraw"));
        }

        // Deduct immediately
        user.walletBalance -= amount;
        await user.save();

        // Create withdrawal record
        const withdrawal = await withdrawalModel.create({
            userId: user?._id,
            amount,
            currency,
            walletAddress
        });

        return logData(res, 201, {
            message: "Your withdrawal request has been received and is pending verification. You will be notified once it is processed."
        });
    }
);

export const getAllWithdrawals = asynchHandler(
    async (req: Request, res: Response) => {
        const user = await getUserById(req.session.user.id);

        const withdrawals = await withdrawalModel.find({ userId: user?._id });

        return logData(res, 201, { withdrawals });
    }
);

export const getTotalWithdrawal = asynchHandler(
    async (req: Request, res: Response) => {
        const user = await getUserById(req.session.user.id);

        const withdrawals = await withdrawalModel.find({
            userId: user?._id,
            status: "approved",
        });

        let totalAmount = 0;
        withdrawals.forEach((withdrawal) => {
            totalAmount += withdrawal.amount;
        });

        return logData(res, 201, { totalAmount });
    }
);
