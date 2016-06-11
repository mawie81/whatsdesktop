'use strict';

const Config = require('electron-config');

module.exports = new Config({
  defaults: {
    darkMode: false,
    closeToTray: false,
    minimizeToTray: false,
    zoomLevel: 0
  }
});
