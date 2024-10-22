// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
    minimize: () => ipcRenderer.send('minimize-window'),
    close: () => ipcRenderer.send('close-window'),
    fetchData: (url) => ipcRenderer.invoke('fetch-data', url),
    findAccount: (data) => ipcRenderer.invoke('find-account', data)
});

ipcRenderer.on('account-found', (event, response) => {
    window.dispatchEvent(new CustomEvent('account-found', { detail: response }));
});