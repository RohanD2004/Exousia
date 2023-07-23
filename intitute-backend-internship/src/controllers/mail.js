
 const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    host: 'smtp.mailgun.org',
    port: 587,
    secure: false,
    auth: {
      user: 'postmaster@sandboxd7e9eec1d4b44bd0a6e204c7b1c054e6.mailgun.org',
      pass: '4474bfdc4811f65e75238096859ae78e-c30053db-7b9b1cb5',
    },
  });
class mailSend {


    async sendMailData(req, res) {
        const mailOptions = {
            from: 'exousia2k23@gmail.com',
            to: 'rohanghuge004@gmail.com',
            subject: "Testing mail data",
            text: "Hi this is dumy test for testing mail is send or not",
          };
        
          try {
            await transporter.sendMail(mailOptions);
            console.log('Email sent successfully');
            res.status(200).json({ message: 'Email sent successfully' });
          } catch (error) {
            console.error('Error sending email:', error);
            res.status(500).json({ error: 'Failed to send email' });
          }
    }

};

module.exports = new mailSend();