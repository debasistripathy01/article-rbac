import passport from "passport";
import express from "express";
import { compareSync } from "bcrypt";
import { Strategy as LocalStrategy } from "passport-local";
import { User } from "../models/user.model";
const Router = express.Router();

export const passportAuth = () => {
  passport.use(
    new LocalStrategy(async (email: String, password: any, done: any) => {
      try {
        const user = await User.findOne({ email });
        if (!user) {
          return done(null, false);
        }
        if (user.password !== password) {
          return done(null, false);
        }
        if (!compareSync(user.password, password)) {
          return done(null, false, { message: "Incorrect Password" });
        }

        return done(null, user); // when user is valid
      } catch (error) {
        return done(error);
      }
    })
  );
};

//Persissts user data inside session data
passport.serializeUser(function (user: any, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id: any, done) {
  User.findById(id, function (err: Object, user: String) {
    done(err, user);
  });
});

export {};
