import mongoose, { Schema, Document } from 'mongoose';

export interface INotification extends Document {
    userId: Schema.Types.ObjectId;
    title: string;
    message: string;
    type: string;
    read: boolean;
    createdAt: Date;
}

const NotificationSchema = new Schema<INotification>(
    {
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        title: { type: String, required: true },
        message: { type: String, required: true },
        type: { type: String, required: true },
        read: { type: Boolean, default: false },
        createdAt: { type: Date, default: Date.now },
    },
    { timestamps: false }
);

export default mongoose.models.Notification || mongoose.model<INotification>('Notification', NotificationSchema);
