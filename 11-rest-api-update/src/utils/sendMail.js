import nodemailer from "nodemailer";
import "dotenv/config";
const base_url = process.env.BASE_URL;

const transporter = nodemailer.createTransport({
  service: process.env.MAIL_SERVICE,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

const createEmail = (email, token) => {
  return {
    from: process.env.MAIL_FROM,
    to: email,
    subject: "Activation Confirmation",
    html:
      "<h3>For Activate Account, click link bellow</h3>" +
      "<a href='" +
      base_url +
      "/api/users/activate/" +
      token +
      "'>Link Activasi</a>",
  };
};

const sendMail = (email, token) => {
  return new Promise((resolve, reject) => {
    transporter.sendMail(createEmail(email, token), (err, info) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        console.log("Email sent: " + info.response);
        resolve(true);
      }
    });
  });
};

export { sendMail };
