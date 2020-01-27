
/**
 * in case to test with ethereal
 * (it not being used for now)
 */

const nodemailer = require("nodemailer");

const test = async(req, res) => {

  const from = req.x.from ? req.x.from : "no_from@noemail.com";
  const to   = req.x.to ? req.x.to : "no_to@noemail.com";

  // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: testAccount.user, // generated ethereal user
        pass: testAccount.pass // generated ethereal password
      }
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from,
      to,
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Hello world?</b>" // html body
    });

    console.log("email: ", nodemailer.getTestMessageUrl(info));
    return res.send(nodemailer.getTestMessageUrl(info));
  }

  module.exports = test;