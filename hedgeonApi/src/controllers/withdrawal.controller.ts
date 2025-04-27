import { Request, Response } from "../utils/Types";
import withdrawalModel from "../models/withdrawal.model";
import asynchHandler from "express-async-handler";
import { emailService } from "..";
import { logData } from "../utils/logger";
import { getUserById } from "../services/user.service";
import { BadRequestError } from "../utils/errors";

export const withdrawalHandler = asynchHandler(
    async (req: Request, res: Response) => {
        const { amount, currency, walletAddress } = req.body;

        // Get user details
        const user = await getUserById(req.session.user.id);

        // Validate that the user has sufficient funds for the withdrawal
        if (user.walletBalance < amount) {
            throw new BadRequestError(
                `Insufficient wallet balance to withdraw`
            );
        }

        // Create withdrawal record
        const withdrawal = await withdrawalModel.create({
            userId: user?._id,
            amount,
            currency,
            walletAddress
        });

        // Send notifications if withdrawal is successful
        if (withdrawal) {
            await Promise.all([
                emailService.sendWithdrawalRequest(user, amount),
                emailService.notifyAdminAboutWithdrawal(
                    user,
                    amount
                ),
            ]);
        }

        return logData(res, 201, { withdrawal });
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
