const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// const sendEmail = async ({ to, subject, text, html }) => {
  const sendEmail = async (mailOptions) => {
  try {

    const response = await sgMail.send(mailOptions);
    console.log('Email sent:', response[0].statusCode);
  } catch (error) {
    console.error('SendGrid error:', error.response?.body || error.message);
    throw error;
  }
};

module.exports = { sendEmail };