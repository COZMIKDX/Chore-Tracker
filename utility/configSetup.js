const fs = require('node:fs');

const configObj = {
    "discordToken": "",
    "targetChannelID": ""
}
const configPath ="./config.json"

if (fs.existsSync(configPath)) {
    console.log("config.json already exists.\nExiting.")
    process.exit();
}

fs.writeFile('./config.json', JSON.stringify(configObj, null, " "), err => {
  if (err) {
    console.error(err);
  } else {
    // file written successfully
    console.log("config.json created.")
  }
});