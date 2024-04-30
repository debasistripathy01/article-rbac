import express from "express";
import { Strategy as LocalStrategy } from "passport-local";
import passport from "passport";
import { User } from "../models/user.model";

const Router = express.Router();

Router.get("/home", (req: any, res: any) => {
  res.send("Home page");
});

Router.post(
  "/register",
  passport.authenticate("local", {
    successRedirect: "/auth/login",
  }),
  async (req: any, res: any) => {
    let userData = new User(req.body);
    await userData.save().then((user: any) => {
      console.log(user);
    });
    res.send("registered user");
  }
);

Router.post(
  "/login",
  passport.authenticate("local-strategy", {
    successRedirect: "/dashboard",
  }),
  async (req: any, res: any) => {
    res.send("Login User");
  }
);

Router.get("/profile", async (req: any, res: any) => {
  res.send("get profile details");
});

export { Router as UserAuth };
