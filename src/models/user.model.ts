import mongoose, { Document, Error, Model, Mongoose, Schema } from "mongoose";
import { UserModel } from "../interfaces/user.interface";
import * as bcrypt from "bcrypt";
// import { compare, genSalt, genSaltSync, hash, hashSync } from "bcrypt-ts";
const user = new Schema<UserModel>(
  {
    firstName: { type: String, required: false },
    lastName: { type: String, required: false },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
    },
    dob: { type: Date, required: false },
    email: { type: String, required: true, lowercase: true, unique: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, required: false },
    employeeId: { type: String, required: false },
  },
  {
    versionKey: false,
  }
);

user.pre<UserModel>("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    // next(error);
    console.log("Error at hashing password", error);
    // next(error);
  }
});

// Custom method to validate password
user.methods.isValidPassword = async function (password: string) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    // throw new Error(error);
    console.log("Error at validating password", error);
  }
};

const User = mongoose.model<UserModel>("User", user);
export { User };
