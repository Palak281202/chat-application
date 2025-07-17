const nodemailer = require("nodemailer"); // install nodemailer

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});

module.exports = (to, subject, html) =>
  transporter.sendMail({ from: process.env.EMAIL, to, subject, html });

