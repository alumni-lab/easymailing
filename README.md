## Easymailing
easymailing is a middleware for express to receive a post request from the front-end and sends out an e-mail using user configured email account.

### Getting Started

`npm i easymailing`

#### require the npm package:
```javascript
const make_send_email = require("easymailing")
```
#### configuration:
```javascript
const config = {
  user: process.env.user,
  password: process.env.password,
  to: 'sales@mycompany.com',
  path: '/mail',
}
const send_email = make_send_email(config)
app.use(send_email);
```

`config.user` and `config.password` is your gmail account/password used to send out the emails
`config.to` is the email account(s) that should receive the emails. For multiple email accounts, you can replace the string with array of strings, e.g. ['sales@mycompany.com','services@mycompany.com']
`config.path` is the path you expect to receive the email request from the front-end

### Connecting with front-end 
easymailing expects a front-end POST request to the path specified in the config. You can either build your own front-end form that sends a POST request with email, subject message in the body, or use the companion npm package easymailing-client `npm i easymailing-client`