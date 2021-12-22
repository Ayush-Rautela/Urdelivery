const express = require("express");
const dotenv = require("dotenv");
// const nodemailer = require("nodemailer");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const app = express();
dotenv.config();
connectDB();

app.use(express.json());

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: "ayushrautela007@gmail.com",
//     pass: ,
//   },
// });

app.use("/api/users", userRoutes);

// var mailOptions = {
//   from: "ayushrautela007@gmail.com",
//   to: "ayushrautela007@gmail.com",
//   subject: "Testing",
//   text: "a ajkhdoasb akjbkab",
// };

// transporter.sendMail(mailOptions, function (error, info) {
//   if (error) {
//     console.log("Error");
//   } else {
//     console.log("Email Sent :" + info.response);
//   }
// });

const PORT = process.env.PORT || 7000;
app.listen(PORT, console.log(`Server started on PORT ${PORT}`));
