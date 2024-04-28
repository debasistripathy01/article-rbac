import mongoose, { Schema } from "mongoose";
import { UserModel } from "../interfaces/user.interface";
import * as bcrypt from "bcrypt";
import createHttpError from "http-errors";
import { Roles } from "../utils/constants";

const userSchema = new Schema<UserModel>(
  {
    firstName: { type: String, required: false },
    lastName: { type: String, required: false },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
    },
    role: {
      type: String,
      enum: [Roles.ADMIN, Roles.USER, Roles.SUPERVISOR, Roles.AGENT],
      default: Roles.USER,
    },
    dob: { type: Date, required: false },
    email: { type: String, required: true, lowercase: true, unique: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, required: false },
    employeeId: { type: String, required: false },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

userSchema.pre<UserModel>("save", async function (next) {
  let user = this;
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    // next(error); // Pass the error to the next middleware
    console.error("Error at hashing password", error);
  }
});

// Custom method to validate password
userSchema.methods.isValidPassword = async function (
  candidatePassword: any,
  done: any
) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) return done(err);
    done(null, isMatch);
  });
};

const User = mongoose.model<UserModel>("User", userSchema);
export { User };
