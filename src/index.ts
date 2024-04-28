import passport from "passport";
import { UserAuth } from "./routes/auth.routes";
import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import session from "express-session";
import MongoStore from "connect-mongo";

import { passportAuth } from "./utils/passport.auth";

const app = express();
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    secret: "keyboardcat",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 1000 * 60 * 60 },
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI as string,
      dbName: "your_db_name", // Set your database name here
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());
passportAuth();

app.get("/data", (req: express.Request, res: express.Response) => {
  res.send("This is home app");
});

app.use("/auth", UserAuth);

const startServer = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log("Server connected to DB");
    const PORT = process.env.PORT || 8001;
    app.listen(PORT, () =>
      console.log(`👉👉 App listening on port ${PORT} 👈👈`)
    );
  } catch (error) {
    console.error("Error connecting to database:", error);
    process.exit(1); // Exit with error
  }
};

startServer();
