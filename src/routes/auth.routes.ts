import express from "express";
import { Strategy as LocalStrategy } from "passport-local";
import passport from "passport";
import { User } from "../models/user.model";
import mongoose from "mongoose";

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
  },
  passport.authenticate("local", {
    successRedirect: "/register",
    failureRedirect: "/login",
  })
);
Router.post(
  "/login",
  passport.authenticate("local", {
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

Router.post("/update-role", async (req: any, res: any, next: any) => {
  try {
    const { id, role } = req.body;
    if (!id || !role) {
      return res.redirect("back");
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.redirect("back");
    }
    const rolesArray = Object.values(role);
    if (!rolesArray.includes(role)) {
      return res.redirect("back");
    }

    let user = await User.findById(
      id,
      { role },
      { new: true, runValidators: true }
    );
    res.redirect("back");
    return user;
  } catch (error) {
    next(error);
  }
});

export { Router as UserAuth };
