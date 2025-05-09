import planModel from "../models/plan.model";
import currencyModel from "../models/currency"

const investmentPlans = [
    {
        name: "Trial Package",
        minAmount: 5000,
        maxAmount: 15000,
        durationMonths: 3, // Using min duration
        durationType: "months",
        estimatedROI: 5, // weekly
        taxOnProfit: 0,
        referralBonus: 3,
        riskLevel: "CONSERVATIVE",
        benefits: [
            "Hands-on experience with fund management",
            "Monthly profit payouts",
            "Access to selected market reports",
            "Flexible upgrade options—move to Basic, Standard, or Premium anytime",
            "Dedicated investment advisor for plan optimization"
        ],
        status: true,
        createdAt: new Date()
    },
    {
        name: "Basic Package",
        minAmount: 30000,
        maxAmount: 70000,
        durationMonths: 6, // Using min duration
        durationType: "months",
        estimatedROI: 7,
        taxOnProfit: 10,
        referralBonus: 5,
        riskLevel: "MODERATE",
        benefits: [
            "Managed portfolio in forex, stocks & real estate",
            "Access to basic market insights & trend reports",
            "Monthly profit withdrawals allowed",
            "Risk-managed strategies to ensure portfolio stability"
        ],
        status: true,
        createdAt: new Date()
    },
    {
        name: "Standard Package",
        minAmount: 100000,
        maxAmount: 500000,
        durationMonths: 12, // Using min duration
        durationType: "months",
        estimatedROI: 11,
        taxOnProfit: 15,
        referralBonus: 7,
        riskLevel: "AGGRESSIVE",
        benefits: [
            "Advanced asset allocation in forex, stocks, hedge funds, & real estate",
            "Personal financial advisor for portfolio optimization",
            "Quarterly performance reports & risk analysis",
            "Higher withdrawal limits & priority support",
            "Invitation to exclusive investment webinars & training"
        ],
        status: true,
        createdAt: new Date()
    },
    {
        name: "Premium Package",
        minAmount: 500000,
        maxAmount: 1500000,
        durationMonths: 24, // Using min duration
        durationType: "months",
        estimatedROI: 15,
        taxOnProfit: 20,
        referralBonus: 10,
        riskLevel: "AGGRESSIVE",
        benefits: [
            "VIP asset management across forex, stocks, hedge funds, private equity, & luxury real estate",
            "Dedicated investment manager with custom portfolio adjustments",
            "Exclusive access to private hedge funds & high-yield opportunities",
            "Tax-efficient investment strategies & wealth preservation plans",
            "Priority withdrawals with same-day processing",
            "Access to private investor events & networking sessions"
        ],
        status: true,
        createdAt: new Date()
    }
];

const currencies = [
    {
        name: 'USDT (TRC-20)',
        address: 'Bo47XfDUKcb31Bbq6661NoVZjZuW26s9Af7BK1mhn4ut', // Replace with your actual USDT address
        qrCodeUrl: 'https://asset.cloudinary.com/dfeoowyra/e1f9fb872dde2ba06aacff9312445857', // Replace with your Cloudinary USDT QR code URL
    },
    {
        name: 'BTC',
        address: 'bc1q6ujvvxafu4td0wpfm4eujyyrxec45wvu8m95lf',     // Replace with your actual BTC address
        qrCodeUrl: 'https://asset.cloudinary.com/dfeoowyra/e97a959e93c3f59847edc911fc68472a',     // Replace with your Cloudinary BTC QR code URL
    },
    {
        name: 'ETH',
        address: 'YOUR_ETH_WALLET_ADDRESS',     // Replace with your actual ETH address
        qrCodeUrl: 'CLOUDINARY_ETH_QR_CODE_URL',     // Replace with your Cloudinary ETH QR code URL
    },
    {
        name: 'SOL',
        address: '0x27F9165b31036D254E449325ef70c6bB4a998eAB',     // Replace with your actual TRX address
        qrCodeUrl: 'https://asset.cloudinary.com/dfeoowyra/d526073a9d77dbbaf302ab837ed1b361',     // Replace with your Cloudinary TRX QR code URL
    },
]

export const insertInvestmentPlans = async () => {
    try {
        for (const plan of investmentPlans) {
            const existingPlan = await planModel.findOne({ name: plan.name });

            if (!existingPlan) {
                await planModel.create(plan);
                console.log(`✅ Plan '${plan.name}' inserted successfully`);
            } else {
                console.log(`ℹ️ Plan '${plan.name}' already exists`);
            }
        }
        console.log("✅ Investment plan insertion process completed");
    } catch (error) {
        console.error("❌ Error adding predefined investment plans:", error);
    }
};

export const insertCurrency = async () => {
    try {
        for (const currency of currencies) {
            const existingCurrency = await currencyModel.findOne({ name: currency.name });

            if (!existingCurrency) {
                await currencyModel.create(currency);
                console.log(`✅ Currency '${currency.name}' inserted successfully`);
            } else {
                console.log(`ℹ️ Currency '${currency.name}' already exists`);
            }
        }
        console.log("✅ Configurrency insertion process completed");
    } catch (error) {
        console.error("❌ Error adding predefined currency:", error);
    }
};
