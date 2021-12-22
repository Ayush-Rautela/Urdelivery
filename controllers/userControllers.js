const User = require("../models/userModels");
const express = require("express");
const nodemailer = require("nodemailer");
const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
// var generator = require("generate-password");

const registerUser = asyncHandler(async (req, res) => {
  // Checking User
  const { email } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("Email is Already  Exists");
  }

  //   Generating Password
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  function generateString(length) {
    let result = "";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  }

  var passW = generateString(8);
  console.log(passW);

  // Send Email

  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "ayushrautela007@gmail.com",
      pass: "uk047303",
    },
  });

  var mailOptions = {
    from: "ayushrautela007@gmail.com",
    to: "ayushrautela007@gmail.com",
    subject: "Password For Login",
    text: "Your Login Password is =" + passW,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });

  // Inserting Data into DataBase

  const newUser = await new User({
    email: req.body.email,
    password: passW,
  });
  console.log(passW);
  console.log(passW.length);
  newUser
    .save()
    .then((user) => res.json(user))
    .catch((err) => console.log(err));
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.comparePassword(password))) {
    res.json({
      _id: user._id,
      email: user.email,
      password: user.password,
    });
  } else {
    res.status(400);
    throw new Error("Incorrect email or password");
  }
});

module.exports = { registerUser, authUser };
