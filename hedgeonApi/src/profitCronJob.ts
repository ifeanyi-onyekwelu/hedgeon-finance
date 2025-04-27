// import cron from "node-cron";
import userModel from "./models/user.model";
import planModel from "./models/plan.model";
import Agenda from "agenda";

const MONGO_DB_URI = process.env.NODE_ENV === 'development' ? process.env.LOCAL_DB_URI : process.env.CLOUD_DB_URI;

const calculateProfit = async () => {
    try {
        // Fetch all users with an active investment plan
        const users = await userModel.find({
            "currentPlan.planId": { $ne: null },
        });

        for (const user of users) {
            const { planId, simulatedDays = 0 } = user.currentPlan;
            const plan = await planModel.findById(planId);

            // Ensure the plan exists
            if (!plan) continue;

            // Calculate daily profit
            const dailyProfit = plan.profit / plan.duration;

            // Check if incrementing simulatedDays will complete the plan duration
            if (simulatedDays + 1 < plan.duration) {
                // Update user's wallet profit
                user.walletBalance += dailyProfit;

                // Increment the simulated day count
                user.currentPlan.simulatedDays += 1;
                user.currentPlan.profitAccumulated += dailyProfit;
                await user.save();

                console.log(
                    `Updated profit for user ${user.username
                    } by ${dailyProfit} (Day ${simulatedDays + 1} of ${plan.duration
                    })`
                );
            } else {
                // If this is the last day, update the profit and remove the plan
                user.walletBalance += dailyProfit;

                user.currentPlan.profitAccumulated += dailyProfit;
                user.currentPlan = null; // Remove the plan immediately
                await user.save();

                console.log(`Ended investment for user ${user.username}`);
            }
        }
    } catch (error) {
        console.error("Error updating profits:", error);
    }
};

const agenda = new Agenda({
    db: { address: MONGO_DB_URI || "" },
});