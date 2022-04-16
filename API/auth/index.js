import express from "express";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import passport from "passport"


// Models
import { UserModel } from "../../database/allModels";

// Validation
import { ValidateSignin, ValidateSignup } from "../../validation/auth";

// Create a router
const Router = express.Router();

/**
 * Router       /signup
 * Des          Register new user
 * Params       none
 * Access       Public
 * Method       POST
 */
 Router.post("/signup", async (req, res) => {
  try {
    const { email, password, fullName, address, phoneNumber } = req.body;
    const checkUserByEmail = await UserModel.findOne({ email });
    const checkUserName = await UserModel.findOne({ password });

    if (checkUserByEmail || checkUserName) {
      return res.json({ user: "User already exists!" });
    }

    // hash password
    const bcryptSalt = await bcrypt.genSalt(8);
    const hashedpassWord = await bcrypt.hash(password, bcryptSalt);

    // save data to database
    await UserModel.create({
      ...req.body,
      password: hashedpassword,
    });

    //generate JWT auth token (package name is jsonwebtoken)
    const token = jwt.sign({ user: { userName, email, password } }, "Morfsys");

    return res.status(200).json({ token, status: "success" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});
/**
 * Router       /signin
 * Des          Sign-in with email and password
 * Params       none
 * Access       Public
 * Method       POST
 */
Router.post("/signin", async (req, res) => {
  try {
    await ValidateSignin(req.body.credentials);
    const user = await UserModel.findByEmailAndPassword(req.body.credentials);
    const token = user.generateJwtToken();
    return res.status(200).json({ token, status: "success" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * Router       /google
 * Des          Google signin
 * Params       none
 * Access       Public
 * Method       GET
 */
Router.get(
  "/google",
  passport.authenticate("google", {
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ],
  })
);

/**
 * Router       /google/callback
 * Des          Google signin callback
 * Params       none
 * Access       Public
 * Method       GET
 */
Router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    return res.redirect(`http://localhost:3000/google/${req.session.passport.user.token}`)
  }
);

export default Router;