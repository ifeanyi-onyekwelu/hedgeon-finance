import mongoose from "mongoose";

export interface IPlan {
    name: string;
    minAmount: number,
    maxAmount: number,
    durationMonths: number,
    estimatedROI: number,
    taxOnProfit: number,
    referralBonus: number,
    riskLevel: 'CONSERVATIVE' | 'MODERATE' | 'AGGRESSIVE'
    benefits: string[],
    status: boolean
    createdAt: Date
}

const planSchema = new mongoose.Schema<IPlan>(
    {
        name: {
            type: String,
            required: true,
        },
        minAmount: Number,
        maxAmount: Number,
        durationMonths: Number,
        estimatedROI: Number,
        taxOnProfit: Number,
        referralBonus: Number,
        riskLevel: String,
        benefits: {
            type: [String],
            required: true
        },
        status: { type: Boolean, default: true },
    },
    {
        timestamps: true,
    }
);

export default mongoose.models.Plan ||
    mongoose.model<IPlan>("Plan", planSchema);
