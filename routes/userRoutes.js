const User = require("../models/userModels.js");
const express = require("express");
// const router = express.router();
const { registerUser, authUser } = require("../controllers/userControllers");

const router = express.Router();

router.route("/").post(registerUser);
router.route("/login").post(authUser);

// router.route("/login").post(authUser);

// router.post("/", (req, res) => {
//   const characters =
//     "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

//   function generateString(length) {
//     let result = " ";
//     const charactersLength = characters.length;
//     for (let i = 0; i < length; i++) {
//       result += characters.charAt(Math.floor(Math.random() * charactersLength));
//     }

//     return result;
//   }

//   var pass = generateString(8);

//   const newUser = new User({
//     email: req.body.email,
//     password: pass,
//   });
//   newUser
//     .save()
//     .then((user) => res.json(user))
//     .catch((err) => console.log(err));
// });

module.exports = router;
