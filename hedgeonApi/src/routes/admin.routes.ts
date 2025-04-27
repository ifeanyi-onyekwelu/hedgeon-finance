import express from 'express';
import isAdmin from '../middlewares/adminOnly';
import {
    getAllInvestmentsView,
    getInvestmentByIdView,
    getInvestmentsByUserView,
    updateInvestmentStatus,
    updateInvestmentAdmin,
    getAllKYCSubmissionsView,
    getKYCByIdView,
    getKYCByUserIdView,
    updateKYCVerificationStatus,
    getAllNotificationsView,
    getNotificationByIdView,
    getNotificationsByUserView,
    getAllPayoutTrackersView,
    getPayoutTrackerByIdView,
    getPayoutTrackerByInvestmentView,
    getAllPlansView,
    getPlanByIdView,
    getAllTransactionsView,
    getTransactionByIdView,
    getAllUsersView,
    getUserByIdView,
    viewUserReferralsView,
    updateUserStatus,
    verifyUserEmail,
    updateUser,
    getAllWithdrawalRequestsView,
    getWithdrawalRequestByIdView,
} from '../controllers/admin.controller';

const router = express.Router();

// Investment Routes
router.get('/investments', isAdmin, getAllInvestmentsView);
router.get('/investments/:investmentId', isAdmin, getInvestmentByIdView);
router.get('/investments/user/:userId', isAdmin, getInvestmentsByUserView);
router.put('/investments/:id/:status', updateInvestmentStatus); //  Admin route
router.put('/investments/:id', updateInvestmentAdmin);

// KYC Routes
router.get('/kyc', isAdmin, getAllKYCSubmissionsView);
router.get('/kyc/:kycId', isAdmin, getKYCByIdView);
router.get('/kyc/user/:userId', isAdmin, getKYCByUserIdView);
router.put('/kyc/:id/verify', isAdmin, updateKYCVerificationStatus);

// Notification Routes
router.get('/notifications', isAdmin, getAllNotificationsView);
router.get('/notifications/:notificationId', isAdmin, getNotificationByIdView);
router.get('/notifications/user/:userId', isAdmin, getNotificationsByUserView);

// Payout Tracker Routes
router.get('/payout-trackers', isAdmin, getAllPayoutTrackersView);
router.get('/payout-trackers/:payoutTrackerId', isAdmin, getPayoutTrackerByIdView);
router.get('/payout-trackers/investment/:investmentId', isAdmin, getPayoutTrackerByInvestmentView);

// Plan Routes
router.get('/plans', isAdmin, getAllPlansView);
router.get('/plans/:planId', isAdmin, getPlanByIdView);

// Transaction Routes
router.get('/transactions', isAdmin, getAllTransactionsView);
router.get('/transactions/:transactionId', isAdmin, getTransactionByIdView);

// User Routes
router.get('/users', isAdmin, getAllUsersView);
router.get('/users/:userId', isAdmin, getUserByIdView);
router.get('/users/:userId/referrals', isAdmin, viewUserReferralsView);
router.put('/users/:userId/status', isAdmin, updateUserStatus);
router.put('/users/:userId/verify-email', isAdmin, verifyUserEmail);
router.put('/users/:userId/', isAdmin, updateUser);

// Withdrawal Routes
router.get('/withdrawals', isAdmin, getAllWithdrawalRequestsView);
router.get('/withdrawals/:withdrawalId', isAdmin, getWithdrawalRequestByIdView);

export default router;