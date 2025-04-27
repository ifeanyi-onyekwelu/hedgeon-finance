import planModel from "../models/plan.model";
import { logData } from "../utils/logger";
import { Request, Response } from "../utils/Types";
import asyncHandler from "express-async-handler";

export const getAllPlans = asyncHandler(async (req: Request, res: Response) => {
    const plans = await planModel.find();
    return logData(res, 200, { plans });
});

export const getPlanDetails = asyncHandler(async (req: Request, res: Response) => {
    const { planId } = req.params;
    console.log(planId)
    if (typeof planId !== 'string') {
        return res.status(400).json({ message: 'Invalid plan ID' });
    }
    const plan = await planModel.findById(planId);
    if (!plan) {
        return res.status(404).json({ message: 'Plan not found' });
    }
    return logData(res, 200, { plan });

});