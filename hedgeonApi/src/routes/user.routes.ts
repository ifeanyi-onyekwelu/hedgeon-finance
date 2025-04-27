import {
    getUserProile,
    updateUser,
    deleteUserProfile,
    changeProfilePhoto,
    getAllReferrals,
} from "../controllers/user.controller";
import { Router } from "express";

const router = Router();

router.get("/profile", getUserProile);
router.get("/referrals", getAllReferrals);
router.put("/update", updateUser);
router.post("/delete", deleteUserProfile);
router.put("/upload", changeProfilePhoto);

export default router;
