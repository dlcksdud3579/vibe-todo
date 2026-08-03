const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const { spawn } = require('child_process');

// Python은 나중에 python/dist 아래에 PyInstaller 결과물을 넣어 연결합니다.
const PYTHON_BINARY = process.platform === 'win32' ? 'todo-bridge.exe' : 'todo-bridge';

function createWindow() {
  const win = new BrowserWindow({
    width: 1440,
    height: 920,
    minWidth: 960,
    minHeight: 680,
    backgroundColor: '#0e131a',
    show: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true
    }
  });

  win.loadFile(path.join(__dirname, '..', 'index.html'));
  win.once('ready-to-show', () => win.show());
}

function pythonPath() {
  return path.join(process.resourcesPath, 'python', PYTHON_BINARY);
}

ipcMain.handle('app:get-info', () => ({
  name: app.getName(),
  version: app.getVersion(),
  platform: process.platform,
  packaged: app.isPackaged
}));

ipcMain.handle('python:run', async (_event, { args = [], input = null } = {}) => {
  if (!app.isPackaged) {
    return { ok: false, error: '개발 모드에서는 아직 Python 브리지가 연결되지 않았습니다.' };
  }

  return new Promise((resolve) => {
    const child = spawn(pythonPath(), args, { windowsHide: true });
    let stdout = '';
    let stderr = '';
    if (input !== null) child.stdin.write(JSON.stringify(input));
    child.stdin.end();
    child.stdout.on('data', (chunk) => { stdout += chunk.toString(); });
    child.stderr.on('data', (chunk) => { stderr += chunk.toString(); });
    child.on('error', (error) => resolve({ ok: false, error: error.message }));
    child.on('close', (code) => resolve({ ok: code === 0, code, stdout, stderr }));
  });
});

ipcMain.handle('workspace:choose-folder', async () => {
  const result = await dialog.showOpenDialog({ properties: ['openDirectory'] });
  return result.canceled ? null : result.filePaths[0];
});

app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
