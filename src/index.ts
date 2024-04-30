import passport from "passport";
import { UserAuth } from "./routes/auth.routes";
import { Server, clienConnect } from "./dbconfig/db.module";
// import chalk from "chalk";
import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import session from "express-session";
import MongoStore from "connect-mongo";
import { strategies } from "passport";
const app = express();
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(passport.session());
app.use(
  session({
    secret: "keyboardcat",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 1000 * 60 * 60 },
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI as string,
      collectionName: "session",
    }),
  })
);
app.use(passport.initialize());
app.use(passport.session());
require("./utils/passport.auth");
app.get("/data", (req: any, res: any) => {
  res.send("This is home app");
});

app.use("/auth", UserAuth);

// Start the server
const PORT = process.env.PORT || 8001;

const startServer = async (): Promise<void> => {
  await mongoose.connect(process.env.MONGODB_URI as string);
  console.log("Server connected to DB");
  // chalk.magentaBright(`Server started with DB`);
  const PORT = process.env.PORT;
  app.listen(PORT, () => console.log(`👉👉 App listening on port${PORT}👈👈`));
};
startServer();
