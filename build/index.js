"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const app = express();
app.use();
app.listen(3000, () => {
    console.log("Server started at 3000");
});
// const startServer = async (): Promise<void> => {
//   //   await connectToDb();
//   //   const PORT = process.env.APP_PORT;
//   app.listen("8000", () =>
//     console.log(console.log(`👉👉 App listening on port"8000"👈👈`))
//   );
// };
