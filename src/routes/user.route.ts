import express from "express";
import { User } from "../models/user.model";
const Router = express.Router();
Router.post("/getData", async (req: any, res: any) => {
  let getData = await User.find({});
  try {
    res.send(200).message({ getData });
  } catch (error) {
    console.log("this is error", error);
  }
});
