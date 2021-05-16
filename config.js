'use strict';

const Config = require('electron-store');

module.exports = new Config({
  defaults: {
    darkMode: false,
    closeToTray: false,
    minimizeToTray: false,
    zoomLevel: 0
  }
});
