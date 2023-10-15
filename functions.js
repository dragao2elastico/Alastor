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

function clear() {
  console.clear()
}

module.exports = { formations, log, clear }