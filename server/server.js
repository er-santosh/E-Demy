import express from "express";
import cors from "cors";
const morgan = require("morgan");
require("dotenv").config();
import { readdirSync } from "fs";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middlewares/errorMiddleware";

/* create express app */
const app = express();

/* database connection */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log("DB Connection", err);
  });

/* middlewares */
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

/* routes */
readdirSync("./routes").map((route) =>
  app.use("/api", require(`./routes/${route}`))
);

app.use(errorHandler);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
