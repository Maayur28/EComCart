const express = require("express");
const cors = require("cors");
const requestLogger = require("./utilities/requestLogger");
const routing = require("./routes/routing");
const errorLogger = require("./utilities/errorLogger");
const app = express();
require('dotenv').config();
const port = 4444;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(requestLogger);
app.use("/", routing);
app.use(errorLogger);

app.listen(process.env.PORT||port, (err) => {
  if (!err) console.log(`Cart Server is started at port ${port}`);
  else console.log("Error in cart server setup");
});

module.exports = app;
