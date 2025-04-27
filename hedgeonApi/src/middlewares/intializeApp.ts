import { createAdmin } from "./createAdmin";
import { insertInvestmentPlans } from "./insertPlans";
import { insertCurrency } from "./insertPlans";

const initializeApp = async () => {
    try {
        await createAdmin();
        await insertInvestmentPlans();
        await insertCurrency();
        console.log("App initialization complete")

    } catch (error) {
        console.error("App initialization failed", error)
    }
}

export default initializeApp;