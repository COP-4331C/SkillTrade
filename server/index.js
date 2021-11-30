const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();

const server = require("http").Server(app);
const io = (module.exports.io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
  },
}));
const socketManager = require("./socketManager");

io.on("connection", socketManager);

// Middleware
app.use(express.json());
app.use(cors());

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static(path.resolve("client/build")));
  app.get(/^\/(?!api).*$/, function (req, res) {
    res.sendFile(path.join(path.resolve("client/build"), "index.html"));
  });
}
app.use("/api/auth", require("./routes/auth.routes.js"));
app.use("/api/user", require("./routes/user.routes.js"));
app.use("/api/conversations", require("./routes/conversation.routes.js"));
app.use("/api/messages", require("./routes/message.routes.js"));
app.use("/api/review", require("./routes/review.routes.js"));
app.use("/api/skills", require("./routes/skill.routes.js"));
connect();

function listen() {
  const port = process.env.PORT || 5000;

  server.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });

  // aws_test();
}

function aws_test() {
  // Load the AWS SDK for Node.js
  var AWS = require("aws-sdk");
  // Set the region
  AWS.config.update({ region: "us-east-2" });

  // Create S3 service object
  s3 = new AWS.S3();

  var bucketParams = {
    Bucket: "skilltrade-bucket",
  };

  // Call S3 to list the buckets
  s3.listObjects(bucketParams, function (err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Success", data.Contents);
    }
  });
}

function connect() {
  mongoose.connection
    .on("error", console.log)
    .on("disconnected", connect)
    .once("open", listen);
  return mongoose.connect(process.env.DB, {
    keepAlive: 1,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}
