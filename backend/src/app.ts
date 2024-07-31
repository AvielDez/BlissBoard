import express from "express";
import morganMiddleware from "./middleware/loggerMiddleware";
import routes from "./routes";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const app = express();
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "BlissBoard API with Swagger",
      version: "1.0.0",
    },
  },
  apis: ["./src/routes/*.ts"], // Path to the API docs
};

const specs = swaggerJsdoc(options);
app.use("/", swaggerUi.serve, swaggerUi.setup(specs));

//Middleware for parsing json
app.use(express.json());
app.use(morganMiddleware);

//Prefix for all routes
app.use("/api/v1/blissboard", routes);

export default app;
