import dotenv from "dotenv";
import { cleanEnv, str, num, url } from "envalid";

dotenv.config();

const env = cleanEnv(process.env, {
  NODE_ENV: str({ choices: ["development", "test", "production"], devDefault: "development" }),
  PORT: num({ devDefault: 3000 }),
  DATABASE_URL: url(),
});

export default env;
