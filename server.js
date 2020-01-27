const express   = require("express");
const PORT      = process.env.PORT || 3333;
const app       = express();

// able to have a .env file to store sensible info without being public
require('dotenv').config();


// importing method to send email
const send_email = require("./send_email.js");


// package to handle data from body
const bodyParser  = require("body-parser");
// package being used
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// checks for JSON malformatted messages
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
app.post("/send_email", send_email);


// front-end being public and served
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, './public', 'index.html'))
// });


// server running
app.listen(PORT, () => console.log(`Server is running at ${PORT}`));

