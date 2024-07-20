import http from "http";
import app from "./app";
import env from "./config/config";

const PORT = env.PORT;

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

async function main() {
  try {
    console.log("Application has started");
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
