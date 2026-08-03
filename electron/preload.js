const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  getAppInfo: () => ipcRenderer.invoke('app:get-info'),
  runPython: (args = [], input = null) => ipcRenderer.invoke('python:run', { args, input }),
  chooseFolder: () => ipcRenderer.invoke('workspace:choose-folder')
});
