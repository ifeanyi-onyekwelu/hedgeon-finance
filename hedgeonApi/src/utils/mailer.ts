import nodemailer from "nodemailer";
import ejs from "ejs";
import path from "path";

const ADMIN_EMAIL = "Support <support@hedgeonfinance.com>"; // Replace with actual admin email

const EMAIL_USER = "support@hedgeonfinance.com"
const EMAIL_PASSWORD = "Pass@hedgeon123"


// Configure your mailer (replace with your actual mailer configuration)
const transporter = nodemailer.createTransport({
    service: 'mail.spacemail.com',
    port: 465,
    auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASSWORD
    }
});

/**
 * Sends an email using an EJS template.
 *
 * @param {string} to - The recipient's email address.
 * @param {string} subject - The subject of the email.
 * @param {string} templateName - The name of the EJS template file (without the .ejs extension).
 * @param {object} templateData - The data to pass to the EJS template.
 */
const sendEmail = async (to: string, subject: string, templateName: string, templateData: any) => {
    try {
        const templatePath = path.join(__dirname, '../views/emails', `${templateName}.ejs`);
        const emailHtml: string = await ejs.renderFile(templatePath, templateData);

        const mailOptions = {
            from: ADMIN_EMAIL!,
            to: to,
            subject: subject,
            html: emailHtml,
        };

        await transporter.sendMail(mailOptions);
        console.log(`Email sent successfully to ${to}`); // Optional logging
    } catch (error: any) {
        console.error(`Error sending email to ${to}:`, error); // Optional logging
        throw new Error(`Failed to send email: ${error.message}`);
    }
};

export default sendEmail