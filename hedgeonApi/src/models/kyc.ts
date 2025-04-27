import mongoose, { Schema, Document } from 'mongoose';

export interface IKYC extends Document {
    userId: Schema.Types.ObjectId;
    idDocumentUrl: string;
    proofOfAddress: string;
    selfieUrl: string;
    verified: boolean;
}

const KYCSchema: Schema<IKYC> = new Schema<IKYC>(
    {
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        idDocumentUrl: { type: String, required: true },
        proofOfAddress: { type: String, required: true },
        selfieUrl: { type: String, required: true },
        verified: { type: Boolean, default: false },
    },
    { timestamps: true }
);

export default mongoose.models.KYC || mongoose.model<IKYC>('KYC', KYCSchema);
