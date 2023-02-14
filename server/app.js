const mongoose = require("mongoose");
const express = require("express");
const chalk = require("chalk");
const config = require("config");
const routes = require("./routes");
const cors = require("cors");
const path = require("path");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use("/api", routes);

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static(path.join(__dirname, "client")));

  const indexPath = path.join(__dirname, "client", "index.html");
  app.get("*", (req, res) => {
    res.sendFile(indexPath);
  });
}
const PORT = config.get("port") ?? 8080;
async function start() {
  try {
    await mongoose.connect(config.get("mongoUri"));
    console.log(chalk.bgGreen(`MongoDb connected!`));
    app.listen(PORT, () => {
      console.log(chalk.bgGreen(`Server has been started on port ${PORT}`));
    });
  } catch (error) {
    console.log(chalk.red(error.message));
    process.exit(1);
  }
}
start();
