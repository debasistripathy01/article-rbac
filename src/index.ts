import passport from "passport";
import { UserAuth } from "./routes/auth.routes";
import { Server, clienConnect } from "./dbconfig/db.module";
// import chalk from "chalk";
import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import * as utilsPass from "./utils/passport.auth";
import mongoose from "mongoose";
import session from "express-session";
import MongoStore from "connect-mongo";

const app = express();
dotenv.config();
app.use(morgan("dev"));
app.use(express.static("public"));
// app.set("view enginer", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// const sessionDBConnection = mongoose.createConnection("http://127.0.0.1:27017", {

// });
app.use(
  session({
    secret: "secretkey",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
    },
    store: new MongoStore({
      mongoUrl: process.env.MONGO_URI,
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req: any, res: any) => {
  res.send("This is home app");
});

app.use("/auth", UserAuth);

// Start the server
const PORT = process.env.PORT || 8001;

const startServer = async (): Promise<void> => {
  await mongoose.connect(process.env.MONGO_URI as string);
  console.log("Server connected to DB");
  // chalk.magentaBright(`Server started with DB`);
  const PORT = process.env.PORT;
  app.listen(PORT, () => console.log(`👉👉 App listening on port${PORT}👈👈`));
};
startServer();
