const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  getAppInfo: () => ipcRenderer.invoke('app:get-info'),
  runPython: (args = [], input = null) => ipcRenderer.invoke('python:run', { args, input }),
  chooseFolder: () => ipcRenderer.invoke('workspace:choose-folder'),
  getGitPeriodLog: (payload) => ipcRenderer.invoke('git:period-log', payload),
  readMarkdownFolder: (folderPath) => ipcRenderer.invoke('workspace:read-markdown-folder', folderPath),
  writeMarkdown: (payload) => ipcRenderer.invoke('workspace:write-markdown', payload),
  createMarkdown: (payload) => ipcRenderer.invoke('workspace:create-markdown', payload),
  deleteMarkdown: (payload) => ipcRenderer.invoke('workspace:delete-markdown', payload)
});
