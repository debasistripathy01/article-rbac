import express from "express";
import { Strategy as LocalStrategy } from "passport-local";
import passport from "passport";
import { User } from "../models/user.model";

const Router = express.Router();

Router.get("/home", async (req: express.Request, res: express.Response) => {
  console.log("Request ==>", req.body);
  try {
    const data = await User.findOne({ email: req.body.email }); // Await for the findOne operation
    if (!data) {
      const userData = new User({
        email: "abcd@gmail.com",
        password: "Debea1234",
      });
      const newUser = await userData.save(); // Await for the save operation
      console.log(newUser);
    }
    res.send("Home page");
  } catch (error) {
    console.log("Error while registering", error);
    res.status(500).send("Internal Server Error");
  }
});

Router.post(
  "/register",
  passport.authenticate("local", { failureRedirect: "/auth/register" }),
  async (req: express.Request, res: express.Response) => {
    try {
      const userData = new User(req.body);
      console.log("request body==>", req.body);
      console.log("User data here ========>", userData);
      const newUser = await userData.save(); // Await for the save operation
      console.log(newUser);
      res.redirect("/auth/login");
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal server error while registering");
    }
  }
);

Router.post(
  "/login",
  passport.authenticate("local-strategy", {
    successRedirect: "/dashboard",
    failureRedirect: "/auth/login", // Add failureRedirect option
  }),
  (req: express.Request, res: express.Response) => {
    res.send("Login User");
  }
);

Router.get("/profile", async (req: express.Request, res: express.Response) => {
  res.send("get profile details");
});

export { Router as UserAuth };
