const express = require("express");
const cors = require("cors");
var path = require("path");
require("dotenv").config();

const app = express();

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static(path.resolve("client/build")));
}

// Middleware
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
