'use strict';
const app = require('electron').app;
const fs = require('fs');
const path = require('path');
const configFile = path.join(app.getPath('userData'), 'config.json');

function readConfigFile () {
  try {
    return JSON.parse(fs.readFileSync(configFile));
  } catch (err) {
    return {};
  }
}

module.exports = {
  set: (key, value) => {
    const config = readConfigFile();
    config[key] = value;
    fs.writeFileSync(configFile, JSON.stringify(config))
  },
  get: key => {
    return readConfigFile()[key];
  }
};
