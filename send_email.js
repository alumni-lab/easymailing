const nodemailer  = require("nodemailer");    // library to send email


// method to send email
const send_email = async(req, res) => {
  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.user,
      pass: process.env.password
    }
  });


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
}


module.exports = send_email;
