var data = new Date();
var time = `${new Date().getHours}:${new Date().getMinutes}:${new Date().getSeconds}`;
require("colors")

var formations = {
    "formations": {
      "comma": ",",
      "slash": "/",
      "hyphen": "-"
    }
};

function log(str, logTimer) {
  // console.log("[" + new Date().toISOString() + "] " + str);  // eslint-disable-line no-undef,no
  if (!logTimer || logTimer == true) console.log("[" + time + "] " + str); 
  else if (logTimer == false) console.log(str);
  else return;
}

module.exports = { formations, log }