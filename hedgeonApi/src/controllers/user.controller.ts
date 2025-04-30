import asyncHandler from "express-async-handler";
import { logData } from "../utils/logger";
import {
    changeProfileImage,
    getUserById,
    updateUserProfile,
} from "../services/user.service";
import { Request, Response } from "../utils/Types";
import uploadImage from "../utils/uploader";
import { emailService } from "..";

export const getUserProile = asyncHandler(
    async (req: Request, res: Response) => {
        const user = await getUserById(req.session.user.id);
        return logData(res, 200, { user });
    }
);

export const getAllReferrals = asyncHandler(
    async (req: Request, res: Response) => {
        const user = await getUserById(req.session.user.id);
        const referrals = user?.referrals;
        return logData(res, 200, { referrals });
    }
);
export const updateUser = asyncHandler(async (req: Request, res: Response) => {
    const user = await updateUserProfile(req.session.user.id, req.body);

    await Promise.all([emailService.sendProfileUpdatedNotification(user)]);

    return logData(res, 200, { user });
});

export const changePassword = asyncHandler(async (req: Request, res: Response) => {
    const { oldPassword, newPassword } = req.body;

    const user = await getUserById(req.session.user.id);

    if (!user || !(await user.comparePassword(oldPassword))) {
        return logData(res, 400, { message: "Invalid old password" });
    }

    user.password = newPassword;
    await user.save();

    // await emailService.sendPasswordChangedNotification(user);

    return logData(res, 200, { message: "Password changed successfully!" });
});

export const deleteUserProfile = asyncHandler(
    async (req: Request, res: Response) => {
        const user = await getUserById(req.session.user.id);
        await user?.deleteOne();

        return logData(res, 200, {
            message: "User deleted successfully!",
            user,
        });
    }
);

export const changeProfilePhoto = asyncHandler(
    async (req: Request, res: Response) => {
        const { image } = req.body;
        const imageUrl = await uploadImage(image);
        const user = await changeProfileImage(req.session.user.id, imageUrl);

        return logData(res, 200, {
            message: "Profile photo uploaded successfully!",
            imageUrl,
            user,
        });
    }
);
