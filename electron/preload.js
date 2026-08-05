const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  getAppInfo: () => ipcRenderer.invoke('app:get-info'),
  runPython: (args = [], input = null) => ipcRenderer.invoke('python:run', { args, input }),
  chooseFolder: (options = {}) => ipcRenderer.invoke('workspace:choose-folder', options),
  validateFolder: (folderPath) => ipcRenderer.invoke('workspace:validate-folder', folderPath),
  openInVSCode: (folderPath) => ipcRenderer.invoke('workspace:open-vscode', folderPath),
  getGitPeriodLog: (payload) => ipcRenderer.invoke('git:period-log', payload),
  getGitStatus: (folderPath) => ipcRenderer.invoke('git:is-repo', folderPath),
  getGitFileMeta: (payload) => ipcRenderer.invoke('git:file-meta', payload),
  readMarkdownFolder: (folderPath) => ipcRenderer.invoke('workspace:read-markdown-folder', folderPath),
  writeMarkdown: (payload) => ipcRenderer.invoke('workspace:write-markdown', payload),
  createMarkdown: (payload) => ipcRenderer.invoke('workspace:create-markdown', payload),
  deleteMarkdown: (payload) => ipcRenderer.invoke('workspace:delete-markdown', payload)
});
