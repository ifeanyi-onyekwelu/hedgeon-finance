import Investment from "../models/investment.model";
import KYC from "../models/kyc";
import Notification from "../models/notification.model";
import PayoutTracker from "../models/payoutTracker.model";
import Plan from "../models/plan.model";
import Transaction from "../models/transaction.model";
import User from "../models/user.model";
import Withdrawal from "../models/withdrawal.model";
import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { NotFoundError } from "../utils/errors"; // Assuming you have this

// -------------------- Investment Views --------------------
export const getAllInvestmentsView = asyncHandler(async (req: Request, res: Response) => {
    const investments = await Investment.find().populate('user', 'name email').populate('plan.planId', 'name');
    res.status(200).json(investments);
});

export const getInvestmentByIdView = asyncHandler(async (req: Request, res: Response) => {
    const { investmentId } = req.params;
    const investment = await Investment.findById(investmentId).populate('user', 'name email').populate('plan.planId', 'name');
    if (!investment) {
        throw new NotFoundError(`Investment with ID ${investmentId} not found`);
    }
    res.status(200).json(investment);
});

export const getInvestmentsByUserView = asyncHandler(async (req: Request, res: Response) => {
    const { userId } = req.params;
    const investments = await Investment.find({ user: userId }).populate('plan.planId', 'name');
    res.status(200).json(investments);
});

// @desc    Update investment status
// @route   PUT /api/investments/:id/status
// @access  Admin
export const updateInvestmentStatus = asyncHandler(
    async (req: Request, res: Response) => {
        const { id, status } = req.params;
        console.log(id)

        // Validate status
        if (!['active', 'paused', 'completed', 'cancelled'].includes(status)) {
            res.status(400).json({ message: 'Invalid status' });
            return;
        }

        const investment = await Investment.findByIdAndUpdate(
            id,
            { status },
            { new: true } // Return the updated document
        );

        if (!investment) {
            res.status(404).json({ message: 'Investment not found' });
            return;
        }

        res.status(200).json({ message: 'Investment status updated', investment });
    }
);

// @desc    Update investment details
// @route   PUT /api/investments/:id
// @access  Admin
export const updateInvestmentAdmin = asyncHandler(
    async (req: Request, res: Response) => {
        const { id } = req.params;
        const {
            investmentAmount,
            startDate,
            endDate,
            roiAccumulated,
            autoReinvest,
            isReinvestment,
            profitAccumulated
        } = req.body;

        const investment = await Investment.findByIdAndUpdate(
            id,
            {
                amount: investmentAmount,
                startDate,
                endDate,
                roiAccumulated,
                autoReinvest,
                isReinvestment,
                profitAccumulated
            },
            { new: true }
        );

        if (!investment) {
            res.status(404).json({ message: 'Investment not found' });
            return;
        }

        res.status(200).json({ message: 'Investment updated', investment });
    }
);

// -------------------- KYC Views --------------------
export const getAllKYCSubmissionsView = asyncHandler(async (req: Request, res: Response) => {
    const kycSubmissions = await KYC.find().populate('userId', 'name email');
    res.status(200).json(kycSubmissions);
});

export const getKYCByIdView = asyncHandler(async (req: Request, res: Response) => {
    const { kycId } = req.params;
    const kyc = await KYC.findById(kycId).populate('userId', 'name email');
    if (!kyc) {
        throw new NotFoundError(`KYC submission with ID ${kycId} not found`);
    }
    res.status(200).json(kyc);
});

export const getKYCByUserIdView = asyncHandler(async (req: Request, res: Response) => {
    const { userId } = req.params;
    const kyc = await KYC.findOne({ userId: userId });
    res.status(200).json(kyc);
});

export const updateKYCVerificationStatus = asyncHandler(
    async (req: Request, res: Response) => {
        const { id } = req.params;
        const { verified } = req.body;

        // Validate the verified value
        if (typeof verified !== 'boolean') {
            res.status(400).json({ message: 'Invalid verification status.  Must be a boolean.' });
            return;
        }

        const kyc = await KYC.findByIdAndUpdate(
            id,
            { verified },
            { new: true, runValidators: true } // Return the updated document and run validation
        ).populate('userId', 'name email');  // Populate user details, adjust as needed

        if (!kyc) {
            res.status(404).json({ message: 'KYC submission not found' });
            return;
        }

        res.status(200).json({ message: `KYC verification status updated to ${verified ? 'Verified' : 'Rejected'}`, data: kyc });
    }
);

// -------------------- Notification Views --------------------
export const getAllNotificationsView = asyncHandler(async (req: Request, res: Response) => {
    const notifications = await Notification.find().populate('userId', 'name email');
    res.status(200).json(notifications);
});

export const getNotificationByIdView = asyncHandler(async (req: Request, res: Response) => {
    const { notificationId } = req.params;
    const notification = await Notification.findById(notificationId).populate('userId', 'name email');
    if (!notification) {
        throw new NotFoundError(`Notification with ID ${notificationId} not found`);
    }
    res.status(200).json(notification);
});

export const getNotificationsByUserView = asyncHandler(async (req: Request, res: Response) => {
    const { userId } = req.params;
    const notifications = await Notification.find({ userId: userId });
    res.status(200).json(notifications);
});

// -------------------- PayoutTracker Views --------------------
export const getAllPayoutTrackersView = asyncHandler(async (req: Request, res: Response) => {
    const payoutTrackers = await PayoutTracker.find().populate('userId', 'name email').populate('investmentId', 'amount plan.name');
    res.status(200).json(payoutTrackers);
});

export const getPayoutTrackerByIdView = asyncHandler(async (req: Request, res: Response) => {
    const { payoutTrackerId } = req.params;
    const payoutTracker = await PayoutTracker.findById(payoutTrackerId).populate('userId', 'name email').populate('investmentId', 'amount plan.name');
    if (!payoutTracker) {
        throw new NotFoundError(`Payout Tracker with ID ${payoutTrackerId} not found`);
    }
    res.status(200).json(payoutTracker);
});

export const getPayoutTrackerByInvestmentView = asyncHandler(async (req: Request, res: Response) => {
    const { investmentId } = req.params;
    const payoutTracker = await PayoutTracker.findOne({ investmentId: investmentId }).populate('userId', 'name email').populate('investmentId', 'amount plan.name');
    res.status(200).json(payoutTracker);
});

// -------------------- Plan Views --------------------
export const getAllPlansView = asyncHandler(async (req: Request, res: Response) => {
    const plans = await Plan.find();
    res.status(200).json(plans);
});

export const getPlanByIdView = asyncHandler(async (req: Request, res: Response) => {
    const { planId } = req.params;
    const plan = await Plan.findById(planId);
    if (!plan) {
        throw new NotFoundError(`Plan with ID ${planId} not found`);
    }
    res.status(200).json(plan);
});

// -------------------- Transaction Views --------------------
export const getAllTransactionsView = asyncHandler(async (req: Request, res: Response) => {
    const transactions = await Transaction.find().populate('userId', 'name email');
    res.status(200).json(transactions);
});

export const getTransactionByIdView = asyncHandler(async (req: Request, res: Response) => {
    const { transactionId } = req.params;
    const transaction = await Transaction.findById(transactionId).populate('userId', 'name email');
    if (!transaction) {
        throw new NotFoundError(`Transaction with ID ${transactionId} not found`);
    }
    res.status(200).json(transaction);
});

// -------------------- User Views --------------------
export const getAllUsersView = asyncHandler(async (req: Request, res: Response) => {
    const users = await User.find();
    res.status(200).json(users);
});

export const getUserByIdView = asyncHandler(async (req: Request, res: Response) => {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
        throw new NotFoundError(`User with ID ${userId} not found`);
    }
    res.status(200).json(user);
});

export const updateUserStatus = asyncHandler(async (req: Request, res: Response) => {
    const { userId } = req.params;
    const { active, suspended } = req.body;

    // Validate that either 'active' or 'suspended' is provided
    if (active === undefined && suspended === undefined) {
        res.status(400).json({ message: 'Please provide either "active" or "suspended" in the request body' });
        return;
    }

    // Construct the update object
    const updateFields: { active?: boolean; suspended?: boolean } = {};
    if (active !== undefined) {
        updateFields.active = active;
    }
    if (suspended !== undefined) {
        updateFields.suspended = suspended;
    }

    // Find and update the user
    const updatedUser = await User.findByIdAndUpdate(userId, updateFields, {
        new: true, // Return the updated user
        runValidators: true, // Run schema validation
    }).select('-password'); // Exclude the password field from the response

    if (!updatedUser) {
        res.status(404).json({ message: 'User not found' });
        return;
    }

    res.status(200).json({
        message: 'User status updated successfully',
        data: updatedUser,
    });
});

export const viewUserReferralsView = asyncHandler(async (req: Request, res: Response) => {
    const { userId } = req.params;
    const user = await User.findById(userId).populate('referrals.userId', 'name email');
    if (!user) {
        throw new NotFoundError(`User with ID ${userId} not found`);
    }
    res.status(200).json(user.referrals);
});

export const verifyUserEmail = asyncHandler(async (req: Request, res: Response) => {
    const { userId } = req.params;
    const { verified } = req.body;

    // Validate that 'verified' is provided
    if (verified === undefined) {
        res.status(400).json({ message: 'Please provide "verified" in the request body' });
        return;
    }

    // Find and update the user
    const updatedUser = await User.findByIdAndUpdate(
        userId,
        { isVerified: verified }, // Use isVerified to match your model
        {
            new: true, // Return the updated user
            runValidators: true, // Run schema validation
        }
    ).select('-password'); // Exclude the password field

    if (!updatedUser) {
        res.status(404).json({ message: 'User not found' });
        return;
    }

    res.status(200).json({
        message: 'User email verification status updated successfully',
        data: updatedUser,
    });
});

export const updateUser = asyncHandler(
    async (req: Request, res: Response) => {
        const { userId } = req.params;
        const {
            name,
            email,
            phone
        } = req.body;

        const user = await User.findByIdAndUpdate(
            userId,
            {
                name,
                email,
                phone,
            },
            { new: true }
        );

        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        res.status(200).json({ message: 'User updated', user });
    }
);

// -------------------- Withdrawal Views --------------------
export const getAllWithdrawalRequestsView = asyncHandler(async (req: Request, res: Response) => {
    const withdrawals = await Withdrawal.find().populate('userId', 'name email');
    res.status(200).json(withdrawals);
});

export const getWithdrawalRequestByIdView = asyncHandler(async (req: Request, res: Response) => {
    const { withdrawalId } = req.params;
    const withdrawal = await Withdrawal.findById(withdrawalId).populate('userId', 'name email');
    if (!withdrawal) {
        throw new NotFoundError(`Withdrawal request with ID ${withdrawalId} not found`);
    }
    res.status(200).json(withdrawal);
});