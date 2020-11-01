require("dotenv").config();
const express = require("express");
const formidable = require("express-formidable");
const cors = require("cors");

const app = express();
app.use(formidable());
app.use(cors());

const api_key = process.env.MAILGUN_API_KEY;
const domain = process.env.MAILGUN_DOMAIN;
const mailgun = require("mailgun-js")({ apiKey: api_key, domain: domain });

app.get("/", (req, res) => {
  res.status(200).json("Bienvenue sur le back");
});

app.post("/", (req, res) => {
  console.log(req.fields);
  const { firstName, lastName, email } = req.fields;
  const data = {
    from: `${firstName} ${lastName} <${email}>`,
    to: "bricebrain@gmail.com, YOU@YOUR_DOMAIN_NAME",
    subject: "Go Reacteur",
    text: "Hello merci d'avoir tester mon formulaire!",
  };
  mailgun.messages().send(data, function (error, body) {
    console.log(body);
  });
  res.status(200).json({ message: req.fields });
});

app.listen(process.env.PORT, () => {
  console.log("server connecté");
});
