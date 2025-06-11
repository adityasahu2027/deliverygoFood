const express = require("express");
const router = express.Router();
const Users = require("../models/User");
const { body, validationResult } = require("express-validator");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "mynameisaditya";
 
// signup user
router.post(
  "/createuser",
  [
    body("email").isEmail(),
    body("name").isLength({ min: 5 }),
    // password must be at least 5 chars long
    body("password", "Password should be greater than 5 character").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);

    try {
      await Users.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
        location: req.body.location,
      });
      res.json({ success: true });
    } catch (error) {
      console.log(error);
      res.json({ success: false, error: "Internal Server Error" });
    }
  }
);

// login user
router.post(
  "/loginuser",
  [
    body("email").isEmail(),
    // password must be at least 5 chars long
    body("password", "Password should be greater than 5 character").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let email = req.body.email;
    try {
      let userData = await Users.findOne({ email });
      if (!userData) {
        return res
          .status(400)
          .json({
            success: false,
            error: "Please try to login with correct credentials",
          });
      }
      const passwordCompare = await bcrypt.compare(
        req.body.password,
        userData.password
      );
      if (!passwordCompare) {
        return res.status(400).json({
          message: "Please try to login with correct credentials",
        });
      } else {
        const data = {
          user: {
            id: userData.id,
          },
        }
        const authToken = jwt.sign(data,JWT_SECRET);
        return res
          .status(200)
          .json({ success: true, message: "User logged in successfully",authToken: authToken });
      }
    } catch (error) {
      console.log(error);
      res.json({ success: false, error: "Internal Server Error" });
    }
  }
);

module.exports = router;
