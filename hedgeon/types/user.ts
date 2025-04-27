export enum UserRole {
    USER = 'user',
    ADMIN = 'admin'
}

export interface Referral {
    userId: string;
    name: string;
    email: string;
}

export interface ReferredBy {
    userId: string;
    name: string;
    email: string;
}

export interface CurrentPlan {
    planId: string;
    name: string;
    startDate: Date;
    endDate: Date;
    daysGone: number;
    investedAmount: number;
    roiAccumulated: number;
}

export interface User {
    _id: string;
    email: string;
    name: string;
    phone: string;
    password: string;
    role: UserRole;
    kyc?: string;
    twoFactorSecret?: string;
    currentPlan?: CurrentPlan;
    walletBalance: number;
    totalInvested: number;
    netReturns: number;
    referrals?: Referral[];
    referredBy?: ReferredBy;
    lastLogin?: string;
    refreshToken?: string | null;
    passwordResetToken?: string | null;
    emailVerificationToken?: number | null;
    isVerified: boolean;
    referralCode?: string | null;
    referralLink?: string | null;
    profilePicture?: string;
    createdAt: Date;
    updatedAt: Date;
}

export type SafeUser = Omit<User, 'password' | 'refreshToken' | 'passwordResetToken' | 'twoFactorSecret'>;