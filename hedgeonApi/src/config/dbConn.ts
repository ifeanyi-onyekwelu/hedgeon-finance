import mongoose from "mongoose";
import initializeApp from "../middlewares/intializeApp";

const dbConn = async () => {
    const CONN_STR =
        process.env.NODE_ENV === "production"
            ? process.env.CLOUD_DB_URI
            : process.env.LOCAL_DB_URI;

    try {
        await mongoose.connect(CONN_STR || "");
        initializeApp();
    } catch (error: any) {
        throw new Error(error);
    }
};

export default dbConn;
