'use strict';
const electron = require('electron');
const ipc = electron.ipcRenderer;
const configStore = electron.remote.require('./config');

function toggleDarkMode() {
  document.documentElement.classList.toggle('dark-mode', configStore.get('darkMode'));
}

ipc.on('toggleDarkMode', () => {
  toggleDarkMode();
});

toggleDarkMode();
