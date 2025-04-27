import { insertCurrency, insertInvestmentPlans } from './insertPlans';
import { hash } from 'bcrypt';
import userModel from '../models/user.model';

export const createAdmin = async () => {
    try {
        // Check if an admin user already exists
        const adminUser = await userModel.findOne({ role: 'admin' });

        if (!adminUser) {
            // Create the admin user
            const newAdmin = await userModel.create({
                name: process.env.ADMIN_NAME,
                email: process.env.ADMIN_EMAIL,
                password: process.env.ADMIN_PASSWORD,
                phone: process.env.ADMIN_PHONE,
                role: 'admin',
                isVerified: true, //  set to true
            });

            console.log('✅ Admin user created successfully:', newAdmin);
        } else {
            console.log('ℹ️ Admin user already exists.');
        }
    } catch (error) {
        console.error('❌ Error creating admin user:', error);
    }
};


