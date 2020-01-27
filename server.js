const express   = require("express");
const PORT      = process.env.PORT || 3333;
const app       = express();

// able to have a .env file to store sensible info without being public
require('dotenv').config();

// library to send email
const nodemailer  = require("nodemailer");

// package to handle data from body
const bodyParser  = require("body-parser");
// packge being used
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// checks if JSON malformatted messages
app.use((err, req, res, next) => {
  if (err) {
    res.status(409).json({
      error: err.message
    });
  }
  else
    next()
});


// the route to get email data from front-end
app.post("/send_email", async (req, res) => {

  // assuming data received from fe:
  const {
    from,
    subject,
    message
  } = req.body;
console.log("===>", from, " + ", subject, " + ", message);
// return res.send("okay");
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
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    // to: "bar@example.com, baz@example.com", // list of receivers
    to: "tony.kieling@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    // text: "Hello world?", // plain text body
    html: `<b>Hello world?</b><br>From: ${from} <br> Subject: ${subject} <br> Message: ${message}` // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  
  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

  return res.send(info.messageId ? info.messageId : "something bad happend");

});



// front-end being public and served
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, './public', 'index.html'))
// });


// server running
app.listen(PORT, () => console.log(`Server is running at ${PORT}`));

