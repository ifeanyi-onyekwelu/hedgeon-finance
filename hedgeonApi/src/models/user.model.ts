import mongoose from "mongoose";
import bcrypt from "bcrypt"


interface IUser {
    email: string,
    name: string,
    phone: string,
    password: string,
    role: 'user' | 'admin',
    kyc: string,
    twoFactorSecret: string,
    currentPlan?: {
        id: mongoose.Types.ObjectId;
        name: string;
        startDate: Date;
        endDate: Date;
        daysGone: number;
        investedAmount: number;
        roiAccumulated: number;
    };
    walletBalance: number
    totalInvested: number;   // Track the total amount invested
    netReturns: number;      // Track the net returns
    referrals?: [
        {
            userId: mongoose.Types.ObjectId;
            name: string;
            email: string;
        }
    ];
    referredBy?: {
        userId: mongoose.Types.ObjectId;
        name: string;
        email: string;
    };
    lastLogin: string;
    refreshToken: string | null;
    passwordResetToken: string | null;
    emailVerificationToken: number | null;
    isVerified: boolean;
    active: boolean;
    suspended: boolean;
    referralCode: string | null;
    referralLink: string | null;
    profilePicture: string;
}

const userSchema = new mongoose.Schema<IUser>({
    email: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'user'
    },
    kyc: String,
    twoFactorSecret: String,
    currentPlan: {
        planId: {
            type: mongoose.Types.ObjectId,
            ref: "Plan",
            default: null,
        },
        name: { type: String, default: null },
        startDate: { type: Date, default: Date.now },
        endDate: { type: Date, default: null },
        daysGone: { type: Number, default: 0 },
        investedAmount: { type: Number, default: 0 },
        roiAccumulated: { type: Number, default: 0 },
    },
    walletBalance: {
        type: Number,
        default: 0,
        min: 0
    },
    totalInvested: {
        type: Number,
        default: 0,
        min: 0
    },
    netReturns: {
        type: Number,
        default: 0,
        min: 0
    },
    referrals: [
        {
            userId: {
                type: mongoose.Types.ObjectId,
                ref: "User",
                default: null,
            },
            name: { type: String, default: null },
            email: { type: String, default: null },
        },
    ],
    referredBy: {
        userId: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            default: null,
        },
        name: { type: String, default: null },
        email: { type: String, default: null },
    },
    lastLogin: { type: String },
    refreshToken: { type: String },
    passwordResetToken: { type: String },
    emailVerificationToken: { type: Number, default: null },
    isVerified: { type: Boolean, default: false },
    active: { type: Boolean, default: true },
    suspended: { type: Boolean, default: false },
    referralLink: { type: String },
    referralCode: { type: String },
    profilePicture: { type: String },
}, { timestamps: true })

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

export default mongoose.models.Investment || mongoose.model<IUser>('User', userSchema);