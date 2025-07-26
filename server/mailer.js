const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendBookingEmail = async (to, subject, text) => {
  try {
    const mailOptions = {
      from: `"Mcken Beauty Salon" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
    };

    await transporter.sendMail(mailOptions);
    console.log("Booking email sent to", to);
  } catch (error) {
    console.error("Error sending email:", error.message);
  }
};

module.exports = sendBookingEmail;
