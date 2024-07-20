import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello, bob!");
});

export default app;
