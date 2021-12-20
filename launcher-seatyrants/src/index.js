const { app, BrowserWindow, Menu, net } = require('electron');
const path = require('path');

require('update-electron-app')({
  repo: 'github-user/repo',
  updateInterval: '1 hour',
  logger: require('electron-log')
})

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1540,
    height: 940,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    },
    icon: __dirname + '/iconApp.ico'
  })

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  // Efface le menu
  //Menu.setApplicationMenu(null);
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});