import nodemailer from "nodemailer";
import Mailgen from "mailgen";

const sendEmail = async (options) => {
  const mailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "AlgoGrader",
      link: "https://algograder.com/",
    },
  });

  var emailText = mailGenerator.generatePlaintext(options.mailGenContent);
  var emailBody = mailGenerator.generate(options.mailGenContent);

  const transporter = nodemailer.createTransport({
    host: process.env.MAILTRAP_SMTP_HOST,
    port: process.env.MAILTRAP_SMTP_PORT,
    secure: false, // true for port 465, false for other ports
    auth: {
      user: process.env.MAILTRAP_SMTP_USER,
      pass: process.env.MAILTRAP_SMTP_PASS,
    },
  });

  const mail = {
    from: process.env.MAILTRAP_SMTP_SENDER, // sender address
    to: options.email, // list of receivers
    subject: options.subject, // Subject line
    text: emailText, // plain text body
    html: emailBody, // html body
  };

  try {
    await transporter.sendMail(mail);
  } catch (error) {
    console.error("Email failed", error);
  }
};

const forgotPasswordMailGenContent = (name, passwordResetUrl) => {
  return {
    body: {
      name: name,
      intro: "We get request to reset your password.",
      action: {
        instructions: "To change your password, please click here:",
        button: {
          color: "#22BC66",
          text: "Reset Password",
          link: passwordResetUrl,
        },
      },
      outro: "This email is not monitored, please do not reply to this email.",
    },
  };
};

export { sendEmail, forgotPasswordMailGenContent };
