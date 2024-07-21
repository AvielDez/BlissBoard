import express from "express";
import morganMiddleware from "./middleware/loggerMiddleware";
import routes from "./routes";

const app = express();

//Middleware for parsing json
app.use(express.json());
app.use(morganMiddleware);

//Prefix for all routes
app.use("/api/v1/blissboard", routes);

export default app;
