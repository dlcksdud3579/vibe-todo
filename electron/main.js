const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs/promises');
const { spawn, execFile } = require('child_process');

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

ipcMain.handle('git:period-log', async (_event, { folderPath, since, until } = {}) => {
  if (!folderPath || !since || !until) return { ok: false, error: 'Git 조회 조건이 부족합니다.' };
  return new Promise((resolve) => {
    execFile('git', ['-C', folderPath, 'log', `--since=${since} 00:00`, `--until=${until} 23:59`, '--date=short', '--pretty=format:%h%x09%ad%x09%s', '--name-only'], { windowsHide: true, maxBuffer: 1024 * 1024 }, (error, stdout, stderr) => {
      if (error) return resolve({ ok: false, error: stderr.trim() || 'Git 저장소가 아니거나 Git 로그를 읽을 수 없습니다.' });
      const lines = stdout.split(/\r?\n/), commits = [], files = new Set();
      let current = null;
      lines.forEach(line => { if (!line.trim()) return; if (/^\S+\t\d{4}-\d{2}-\d{2}\t/.test(line)) { const [hash, date, ...message] = line.split('\t'); current = { hash, date, message: message.join('\t'), files: [] }; commits.push(current); } else if (current) { current.files.push(line.trim()); files.add(line.trim()); } });
      resolve({ ok: true, commits, files: [...files] });
    });
  });
});

ipcMain.handle('workspace:read-markdown-folder', async (_event, folderPath) => {
  if (!folderPath) return { ok: false, error: 'TODO 폴더가 지정되지 않았습니다.' };
  try {
    const mainFileName = '00-project-main.md';
    const mainFilePath = path.join(folderPath, mainFileName);
    try { await fs.access(mainFilePath); } catch {
      await fs.writeFile(mainFilePath, '# 프로젝트 메인 TODO\n\n## 목표\n\n프로젝트의 전체 목표와 방향을 작성하세요.\n\n## 핵심 TODO\n\n- [ ] 프로젝트 목표 정리\n- [ ] 다음 개발 단계 결정\n\n## 메모\n\n', 'utf8');
    }
    const entries = await fs.readdir(folderPath, { withFileTypes: true });
    const files = [];
    for (const entry of entries.filter(item => item.isFile() && item.name.toLowerCase().endsWith('.md'))) {
      const filePath = path.join(folderPath, entry.name);
      const content = await fs.readFile(filePath, 'utf8');
      const stat = await fs.stat(filePath);
      // 일반 문서나 README는 제외하고, Markdown 체크박스가 있는 파일만 TODO로 취급합니다.
      if (!/^\s*[-*+]\s+\[[ xX>]\]\s+.+$/m.test(content)) continue;
      files.push({ name: entry.name.replace(/\.md$/i, ''), fileName: entry.name, isMain: entry.name.toLowerCase() === mainFileName, content, modifiedAt: stat.mtime.toISOString() });
    }
    files.sort((a, b) => Number(b.isMain) - Number(a.isMain) || a.name.localeCompare(b.name));
    return { ok: true, files };
  } catch (error) {
    return { ok: false, error: error.message };
  }
});

function safeMarkdownPath(folderPath, fileName) {
  const root = path.resolve(folderPath);
  const target = path.resolve(root, fileName);
  if (path.dirname(target) !== root || !target.toLowerCase().endsWith('.md')) throw new Error('허용되지 않은 Markdown 파일 경로입니다.');
  return target;
}

ipcMain.handle('workspace:write-markdown', async (_event, { folderPath, fileName, content }) => {
  try { await fs.writeFile(safeMarkdownPath(folderPath, fileName), content, 'utf8'); return { ok: true }; }
  catch (error) { return { ok: false, error: error.message }; }
});

ipcMain.handle('workspace:create-markdown', async (_event, { folderPath, fileName, content = '' }) => {
  try { await fs.writeFile(safeMarkdownPath(folderPath, fileName), content, { encoding: 'utf8', flag: 'wx' }); return { ok: true }; }
  catch (error) { return { ok: false, error: error.message }; }
});

ipcMain.handle('workspace:delete-markdown', async (_event, { folderPath, fileName }) => {
  try { await fs.unlink(safeMarkdownPath(folderPath, fileName)); return { ok: true }; }
  catch (error) { return { ok: false, error: error.message }; }
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
