import express from "express";
import passport from "passport";
import { User } from "../models/user.model";
import mongoose from "mongoose";

const Router = express.Router();

Router.post(
  "/login"
  // passport.authenticate("local", { failureRedirect: "/login" })
);
// Registration route
Router.post(
  "/register",
  // passport.authenticate("local-register", {
  //   successRedirect: "/dashboard",
  //   failureRedirect: "/register",
  //   failureFlash: true, // Enable flash messages for registration failures
  // }),
  async (req: any, res: any, next) => {
    try {
      const doesExists = await User.findOne({ email: req.body.email });
      if (doesExists) {
        res.failureRedirect("/auth/login");
        return;
      }

      const newData = new User(req.body, {
        versionKey: false,
        __dirname: false,
      });
      await newData.save();
      res.send("Data is saved Now in Typescript");
    } catch (error) {
      next(error);
      // console.log("Error while registering", error);
    }
  }
);
Router.post(
  "/login",
  // passport.authenticate("local-login", {
  //   successRedirect: "/dashboard",
  //   failureRedirect: "/login",
  //   failureFlash: true, // Enable flash messages for authentication failures
  // }),

  async (req: any, res: any, next) => {
    try {
    } catch (error) {
      console.log("Error while logging in");
    }
  }
);

// Dashboard route
Router.get("/dashboard", (req: any, res: any) => {
  console.log("This is dashboard");
  res.send("Welcome to the dashboard2!");
});

export { Router as UserAuth };
