import mongoose, { Schema, Document } from 'mongoose';
import { Currency } from './transaction.model';

export interface IWithdrawal extends Document {
    userId: Schema.Types.ObjectId;
    amount: number;
    currency: Currency;
    walletAddress: string;
    status: 'PENDING' | 'APPOVED' | 'FAILED' | 'DECLINED';
    createdAt: Date;
}

const WithdrawalSchema = new Schema<IWithdrawal>(
    {
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        amount: { type: Number, required: true },
        currency: { type: String, enum: Object.values(Currency), required: true },
        walletAddress: { type: String, required: true },
        status: { type: String, default: 'PENDING' },
    },
    { timestamps: true }
);

export default mongoose.models.Withdrawal || mongoose.model<IWithdrawal>('Withdrawal', WithdrawalSchema);
