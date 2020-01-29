const express   = require("express");
const PORT      = process.env.PORT || 3333;
const app       = express();

// able to have a .env file to store sensible info without being public
require('dotenv').config();


// importing method to send email
const make_send_email = require("./module/");


// package to handle data from body
const bodyParser  = require("body-parser");
// package being used
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// checks for JSON malformatted messages
app.use((err, req, res, next) => {
  if (err) {
    res.status(409).json({
      error: `Sorry, ERROR: ${err.message}`
    });
  }
  else
    next()
});


const config = {
  user: process.env.user,
  password: process.env.password,
  path: '/mail',
}
const send_email = make_send_email(config)
app.use(send_email);



// // the route to get email data from front-end
// app.post("/send_email", send_email);


// front-end being public and served
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, './public', 'index.html'))
// });


// server running
app.listen(PORT, () => console.log(`Server is running at ${PORT}`));

