// index.js
// where your node app starts
require("dotenv").config();
// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api/:date", (req, res) => {
  try {
    const date = req.params.date;
    const numbersRegex = /^[0-9]+$/;
    const isUnitFormat = numbersRegex.test(date);
    let unixDate;
    let utcDate;
    if (!isUnitFormat) {
      if (new Date(date).toUTCString() === "Invalid Date") {
        return res.status(200).json({ error: "Invalid Date" });
      }
      unixDate = Date.parse(date);
      utcDate = new Date(date).toUTCString();
    } else {
      unixDate = Number(date);
      const actualDate = new Date(unixDate);
      utcDate = actualDate.toUTCString();
    }
    res.status(200).json({
      unix: unixDate,
      utc: utcDate,
    });
  } catch (error) {
    res.status(200).json({ error: "Invalid Date" });
  }
});

app.get("/api", (req, res) => {
  const date = new Date();
  res.status(200).json({
    unix: date.getTime(),
    utc: date.toUTCString(),
  });
});

const port = process.env.PORT || 3000;
// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
