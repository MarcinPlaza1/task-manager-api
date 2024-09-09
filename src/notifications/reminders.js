import cron from 'node-cron';
import nodemailer from 'nodemailer';
import Task from '../models/task.js';
import User from '../models/user.js';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,  // Add your email to the .env file
        pass: process.env.EMAIL_PASSWORD  // Add password to .env file
    }
});

const mailOptions = {
    from: process.env.EMAIL,
    to: 'recipient@example.com',
    subject: 'Test Email',
    text: 'Hello, this is a test email from Task Manager API'
};

transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.log('Error sending email:', error);
    } else {
        console.log('Email sent: ' + info.response);
    }
});

cron.schedule('0 9 * * *', async () => {
    try {
        const tasks = await Task.find({
            deadline: {
                $gte: new Date(),
                $lte: new Date(Date.now() + 24 * 60 * 60 * 1000)
            }
        });

        for (let task of tasks) {
            const user = await User.findById(task.owner);
            if (user) {
                const mailOptions = {
                    from: process.env.EMAIL,
                    to: user.email,
                    subject: 'Reminder of the task',
                    text: `You have a task "${task.title}" to complete by tomorrow.`
                };
                await transporter.sendMail(mailOptions);
            }
        }
    } catch (e) {
        console.error('Error sending reminders:', e);
    }
});

export default transporter;
