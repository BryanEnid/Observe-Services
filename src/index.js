const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
const https = require("https");

const credentials = { key: null, cert: null };

// Needs to be loaded before config
if (process.env.NODE_ENV === "production") {
  dotenv.config({ path: path.join(__dirname, "../.env") });
  credentials.key = fs.readFileSync("/etc/nginx/private.key", "utf8");
  credentials.cert = fs.readFileSync("/etc/nginx/certificate.crt", "utf8");
} else {
  dotenv.config({ path: path.join(__dirname, `../.env.${process.env.NODE_ENV}`) });
}

const config = require("config");
const app = require("./app");
const { swagger } = require("../swagger/swagger");
const { logger } = require("./utils/logger");

const port = parseInt(config.get("http.port"), 10);
const host = config.get("http.host");

app().then((expressApp) => {
  swagger(expressApp);

  // HTTP
  expressApp.listen(port, host, () => {
    logger().info(`Listening on http://${host}:${port}`);
  });

  // HTTPS
  https.createServer(credentials, expressApp).listen(8443, host, () => {
    logger().info(`Listening on http://${host}:${port}`);
  });
});
