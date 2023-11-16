import nodemailer from "nodemailer";
import "dotenv/config";
const base_url = process.env.BASE_URL;

const transporter = nodemailer.createTransport({
  service: process.env.MAIL_SERVICE,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
    // pass: "kmitedmrvcdsspzn",
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

const contentPwd = (email, password) => {
  return {
    from: process.env.MAIL_FROM,
    to: email,
    subject: "Forgot Password",
    html:
      "<h3>Your new account password is :</h3>" +
      "<table>" +
      "<tr><td>Email :</td><td>" +
      email +
      "</td></tr>" +
      "<tr><td>Password :</td><td>" +
      password +
      "</td></tr>" +
      "</table>",
  };
};

const sendMail = (email, token) => {
  return new Promise((resolve, reject) => {
    transporter.sendMail(createEmail(email, token), function (error, info) {
      if (error) {
        console.log(error);
        resolve(false);
      } else {
        console.log("Email sent: " + info.response);
        resolve(true);
      }
    });
  });
};

const sendPassword = (email, password) => {
  return new Promise((resolve, reject) => {
    transporter.sendMail(contentPwd(email, password), function (error, info) {
      if (error) {
        console.log(error);
        resolve(false);
      } else {
        console.log("Email sent: " + info.response);
        resolve(true);
      }
    });
  });
};

export { sendMail, sendPassword };
