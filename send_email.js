// library to send email
const nodemailer  = require("nodemailer");

module.exports = (config) => {

  console.log("config", config);
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    // host: process.env.host,
    // port: process.env.port,
    // secure: process.env.secure, // true for 465, false for other ports
    service: "gmail",
    auth: {
      user: process.env.user, // generated ethereal user
      pass: '3@syma1l1ngLHLJan26th' // generated ethereal password      
    }
  });
  //config
  // mail path /mail
  // mail user 
  // mail pass

  // method to send email...
  const send_email = async (req, res, next) => {
console.log("data coming from client:", req.body);
    if (config.user === "user") {
      req.x = req.body;
      return next();
    }

  // assuming data received from fe:
    const {
      email,
      subject,
      message
    } = req.body;

    // if req path and method match config path then send mail
    // otherwise pass on execution with next();
    
  console.log("process.env.user", process.env.user)
  console.log("process.env.passsword", process.env.password)
  
  
    try {
      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: email,
        to: "tony.kieling@gmail.com", // list of receivers
        subject: "Hello ✔", // Subject line
        html: `<b>Hello world?</b><br>From: ${from} <br> Subject: ${subject} <br> Message: ${message}` // html body
      });
  
      console.log("Message sent: %s", info.messageId);
  
      return res.send(info.messageId ? nodemailer.getTestMessageUrl(info) : "something bad happend");
  
    } catch (err) {
      console.log("### Error: ", err.message);
      return res.send(`###ERROR: ${err.message}`);
    }
  }

  return send_email;
}
