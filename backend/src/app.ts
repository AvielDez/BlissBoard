import express from "express";
import authRouter from "./routes/authRoutes";
import morganMiddleware from "./middleware/loggerMiddleware";

const app = express();

//Middleware for parsing json
app.use(express.json());
app.use(morganMiddleware);

//Routes
app.use("/auth", authRouter);

app.get("/", (req, res) => {
  res.send("Hello, bob!");
});

export default app;
