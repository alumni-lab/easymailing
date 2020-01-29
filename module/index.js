const nodemailer  = require("nodemailer");    // library to send email


const make_send_email = (config) => {

  // method to send email
  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: config.user,
      pass: config.password
    }
  });

  const send_email = async(req, res, next) => {
console.log("req.path", req.path);
    if (req.path === config.path) { //this matches the config path
      
        // data received from fe:
        const {
          email,
          subject,
          message
        } = req.body;  
      
        try {
          const info = await transporter.sendMail({
            from: email,
            to: ["tony.kieling@gmail.com", "chih.chia.chuang@gmail.com"],
            subject: "Hello ✔",
            html: `<b>Hello world?</b><br> <b>From</b>: ${email} <br> <b>Subject:</b> ${subject} <br> <b>Message:</b> ${message}`
          });
      
          // sending back to client's app
          return res.send(info.messageId 
            ? `${JSON.stringify({message: "SUCCESS"})} \n ${info.response} \n messageId = ${info.messageId}\n${JSON.stringify(info.envelope)}` 
            : "something bad happend" );
      
        } catch (err) { // handling errors
          console.log("### Error: ", err.message);
          return res.send(`###ERROR: ${err.message}`);
        }
      
    } else {
      next();
    }
  }
  
  return send_email;
}

  
  
  module.exports = make_send_email;
