import mongoose, { Schema, Document } from 'mongoose';

export interface IPayoutTracker extends Document {
    userId: Schema.Types.ObjectId;
    investmentId: Schema.Types.ObjectId;
    expectedROI: number;
    paidROI: number;
    lastPaidAt?: Date;
}

const PayoutTrackerSchema = new Schema<IPayoutTracker>(
    {
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        investmentId: { type: Schema.Types.ObjectId, ref: 'Investment', required: true },
        expectedROI: { type: Number, required: true },
        paidROI: { type: Number, default: 0 },
        lastPaidAt: { type: Date },
    },
    { timestamps: false }
);

export default mongoose.models.PayoutTracker || mongoose.model<IPayoutTracker>('PayoutTracker', PayoutTrackerSchema);
