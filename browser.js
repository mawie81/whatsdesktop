'use strict';
const electron = require('electron');
const ipc = electron.ipcRenderer;
const configStore = electron.remote.require('./config');

function toggleDarkMode() {
  document.documentElement.classList.toggle('dark-mode', configStore.get('darkMode'));
}

function updateZoomLevel() {
  electron.webFrame.setZoomLevel(configStore.get('zoomLevel'));
}

ipc.on('toggleDarkMode', toggleDarkMode);

ipc.on('updateZoomLevel', updateZoomLevel);

document.addEventListener('DOMContentLoaded', () => {
  toggleDarkMode();
  updateZoomLevel();
});
