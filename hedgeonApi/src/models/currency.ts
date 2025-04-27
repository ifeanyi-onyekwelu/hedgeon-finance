import mongoose, { Schema, Document } from 'mongoose';

export interface ICurrency extends Document {
    name: string;
    address: string;
    qrCodeUrl: string;
}

const CurrencySchema = new Schema<ICurrency>(
    {
        name: String,
        address: String,
        qrCodeUrl: String
    },
);

export default mongoose.models.Currency || mongoose.model<ICurrency>('Currency', CurrencySchema);
