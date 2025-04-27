import { Request, Response } from "../utils/Types";
import asyncHandler from "express-async-handler";
import { BadRequestError, NotFoundError } from "../utils/errors";
import { logData, logError } from "../utils/logger";
import { getUserById } from "../services/user.service";
import planModel from "../models/plan.model";
import Investment from "../models/investment.model";
import Transaction from "../models/transaction.model";
import { emailService } from "..";

export const createInvestment = asyncHandler(
    async (req: Request, res: Response) => {
        const { planId, amount, currency } = req.body;
        const user = await getUserById(req.session.user.id);

        if (!user) throw new BadRequestError("User not found");
        if (!planId) throw new BadRequestError("Plan ID is required");
        if (!amount) throw new BadRequestError("Investment amount is required");

        // Get selected plan
        const plan = await planModel.findById(planId);
        if (!plan) throw new NotFoundError("Investment plan not found");

        // Validate investment amount
        if (amount < plan.minAmount) {
            throw new BadRequestError(
                `Minimum investment for this plan is ${plan.minAmount}`
            );
        }
        if (amount > plan.maxAmount) {
            throw new BadRequestError(
                `Maximum investment for this plan is ${plan.maxAmount}`
            );
        }

        // Create investment
        const investment = await Investment.create({
            user: user._id,
            plan: {
                planId: plan._id,
                name: plan.name,
            },
            currency,
            amount,
            startDate: new Date(),
            endDate: new Date(Date.now() + plan.duration * 86400000), // Convert days to ms
        });

        // Update user's current plan
        // user.currentPlan = {
        //     planId: plan._id,
        //     name: plan.name,
        //     startDate: new Date(),
        //     endDate: investment.endDate,
        //     investedAmount: amount,
        // };
        // await user.save();

        // Create transaction record
        await Transaction.create({
            userId: user._id,
            amount,
            type: "INVESTMENT",
            status: "COMPLETED",
            currency
        });

        // Send notifications
        // await Promise.all([
        //     emailService.sendInvestmentConfirmation(user, investment),
        //     emailService.notifyAdminAboutInvestment(user, investment),
        // ]);

        logData(res, 201, {
            success: true,
            investment,
            newBalance: user.walletBalance,
        });
    }
);

export const reinvestEarnings = asyncHandler(
    async (req: Request, res: Response) => {
        const { amount, planId } = req.body;
        const user = await getUserById(req.session.user.id);

        if (!user.currentPlan?.roiAccumulated || user.currentPlan.roiAccumulated < amount) {
            throw new BadRequestError("Insufficient ROI earnings for reinvestment");
        }

        const plan = await planModel.findById(planId);
        if (!plan) throw new NotFoundError("Plan not found");

        // Deduct from ROI
        user.currentPlan.roiAccumulated -= amount;
        user.walletBalance += amount; // Add back to wallet for reinvestment

        // Create new investment
        const investment = await Investment.create({
            user: user._id,
            plan: {
                planId: plan._id,
                name: plan.name,
            },
            amount,
            isReinvestment: true,
            startDate: new Date(),
            endDate: new Date(Date.now() + plan.duration * 86400000),
            status: "active",
        });

        // Update user's wallet and plan
        user.walletBalance -= amount;
        user.currentPlan = {
            planId: plan._id,
            name: plan.name,
            startDate: new Date(),
            endDate: investment.endDate,
            investedAmount: amount,
            roiAccumulated: 0,
        };

        await user.save();

        logData(res, 200, {
            success: true,
            investment,
            newROIBalance: user.currentPlan.roiAccumulated,
        });
    }
);

// Add other necessary controllers (getInvestments, calculateROI, etc.)