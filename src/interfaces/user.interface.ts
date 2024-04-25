import { Document } from "mongoose";
import { TimeStamps } from "./timestamps";

export interface UserModel extends Document, TimeStamps {
  role: any;
  firstName: string;
  lastName: string;
  gender: string;
  dob: Date;
  email: string;
  password: string;
  employeeId: string;
  phoneNumber: string;
}
