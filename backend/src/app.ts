import express from "express";
import authRouter from "./routes/authRoutes";

const app = express();

//Middleware for parsing json
app.use(express.json());

//Routes
app.use("/auth", authRouter);

app.get("/", (req, res) => {
  res.send("Hello, bob!");
});

export default app;
