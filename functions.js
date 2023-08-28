var data = new Date();
var time = `${new Date().getHours}:${new Date().getMinutes}:${new Date().getSeconds}`;
require("colors");
const express = require("express");
const app = express();
const path = require("path");

var formations = {
    "formations": {
      "comma": ",",
      "dot": ".",
      "colon":" : ",
      "space": "  ",
      "slash": "/",
      "hyphen": "-",
      "underscore":"_"
    }
};

function log(str, logTimer) {
  // console.log("[" + new Date().toISOString() + "] " + str);  // eslint-disable-line no-undef,no
  if (!logTimer || logTimer == true) console.log("[" + time + "] " + str); 
  else if (logTimer == false) console.log(str);
  else return;
}

function loadErrors() {
  app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'server', 'err', '404.html'));
  });

  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).sendFile(path.join(__dirname, 'server', 'err', '500.html'));
  });

  app.use((req, res, next) => {
    res.status(400).sendFile(path.join(__dirname, 'server', 'err', '400.html'));
  });

  app.use((req, res, next) => {
    res.status(401).sendFile(path.join(__dirname, 'server', 'err', '401.html'));
  });

  app.use((req, res, next) => {
    res.status(403).sendFile(path.join(__dirname, 'server', 'err', '403.html'));
  });

  app.use((req, res, next) => {
    res.status(405).sendFile(path.join(__dirname, 'server', 'err', '405.html'));
  });

  app.use((req, res, next) => {
    res.status(408).sendFile(path.join(__dirname, 'server', 'err', '408.html'));
  });

  app.use((req, res, next) => {
    res.status(429).sendFile(path.join(__dirname, 'server', 'err', '429.html'));
  });

  app.use((req, res, next) => {
    res.status(503).sendFile(path.join(__dirname, 'server', 'err', '503.html'));
  });

  app.use((req, res, next) => {
    res.status(504).sendFile(path.join(__dirname, 'server', 'err', '504.html'));
  });
  console.log("🤖 Successfully loaded".green, "error".red, "pages".green)
}

function clear() {
  console.clear()
}

module.exports = { formations, log, loadErrors, clear }