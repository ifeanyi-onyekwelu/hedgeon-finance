import {
    getAllPlans,
    getPlanDetails,
} from "../controllers/plan.controller";
import { Router } from "express";

const router = Router();
router.get("/", getAllPlans);
router.get("/:planId", getPlanDetails);

export default router;
