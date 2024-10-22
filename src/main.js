const { app, BrowserWindow, ipcMain } = require('electron');
const axios = require('axios');
const path = require('node:path');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1080,
    height: 720,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      nodeIntegration: true,

    },
    autoHideMenuBar: true,
    frame: false,
    resizable: false,
    maximizable: false
  });

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
ipcMain.on('minimize-window', (event) => {
  const win = BrowserWindow.fromWebContents(event.sender);
  if (win) {
      win.minimize();
  }
});
ipcMain.on('close-window', (event)=>{
  const win = BrowserWindow.fromWebContents(event.sender);
  if (win) {
    win.close();
  }
})


ipcMain.handle('fetch-data', async (event, url) => {
  try {
    const response = await axios.get(url);
    return response.data; // Send the response data back to the renderer
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // Propagate the error back to the renderer
  }
});

ipcMain.handle('find-account', async (event, data) =>{
  try {
    const searchAcc = await axios.post('https://rbms-backend-g216.onrender.com/findAccount', data);
    if(searchAcc.data.isFound){
      event.sender.send('account-found', {
        found: true,
        uname:  searchAcc.data.uName,
        sAdmin:  searchAcc.data.isSAdmin,
      })
      return;
    }else{
      event.sender.send('account-found', {
        found: false
      })
      return;
    }
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
})
