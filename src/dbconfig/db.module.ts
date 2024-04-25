import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const clienConnect = mongoose.connect(process.env.MONGO_URI as string);
const Server = async () => {
  const dbConnect: Promise<any> = new Promise((resolve, reject) => {
    mongoose.set("strictQuery", false);
    mongoose
      .connect(process.env.MONGO_URI as string)
      .then(() => {
        console.log("Database connection has been established");
        resolve("Database connection has been established");
      })
      .catch((err) => reject(err));
  });

  return dbConnect;
};

export { clienConnect, Server };
