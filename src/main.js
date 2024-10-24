const { app, BrowserWindow, ipcMain } = require('electron');
const axios = require('axios');
const cloudinary = require('cloudinary').v2
const path = require('node:path');
require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1250,
    height: 720,
    title: 'RBMS-Desktop',
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
ipcMain.on('close-window', (event) => {
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

ipcMain.handle('find-account', async (event, data) => {
  try {
    const searchAcc = await axios.post('https://rbms-backend-g216.onrender.com/findAccount', data);
    if (searchAcc.data.isFound) {
      event.sender.send('account-found', {
        found: true,
        uname: searchAcc.data.uName,
        sAdmin: searchAcc.data.isSAdmin,
      })
      return;
    } else {
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

ipcMain.handle('upload-bike', async (event, data) => {
  try {
    const result = await cloudinary.uploader.upload(data.i_bike_image, {
      folder: 'bikeImages' // Optional: specify a folder in Cloudinary
    });

    if(result){
      // console.log(result.secure_url);
      const {i_bike_image, ...rest} = data;
      const uploadData = {
        ...rest,
        i_bike_image_url: result.secure_url
      }
      // console.log(uploadData);
      const uploadBike = await axios.post('http://localhost:8917/uploadBikeInfo', uploadData);
      // const uploadBike = await axios.post('https://rbms-backend-g216.onrender.com/uploadBikeInfo', uploadData);
      console.log(uploadBike.data);
      if(uploadBike.data.isUploaded){
        event.sender.send('bike-uploaded', {
          uploaded: true
        })
      }else{
        event.sender.send('bike-uploaded', {
          uploaded: false
        })
      }
    }
  } catch (error) {
    console.error('Error uploading bike:', error);
    throw error;
  }
})