import nodemailer from "nodemailer"
require('dotenv').config();

// Create a transporter
const transporter = nodemailer.createTransport({
    service: 'gmail', // Use 'gmail', 'outlook', etc. for popular services
    auth: {
        user: process.env.EMAIL, // Your email address
        pass: process.env.PASSWORD, // Your email password or app-specific password
    },
});

// Verify transporter
transporter.verify((error, success) => {
    if (error) {
        console.error('Error setting up transporter:', error);
    } else {
        console.log('Transporter is ready to send emails');
    }
});

app.post('/send-email', async (req, res) => {
    const { to, subject, text } = req.body;

    const mailOptions = {
        from: process.env.EMAIL,
        to: to,
        subject: subject,
        text: text,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Email sent successfully', info });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Failed to send email', error });
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
