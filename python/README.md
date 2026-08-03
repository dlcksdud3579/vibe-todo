# Python bridge

이 폴더는 Electron 앱에서 호출할 Python 기능을 둡니다.

배포용 브리지는 `python/dist/todo-bridge.exe`(Windows) 또는
`python/dist/todo-bridge`(macOS/Linux)에 둡니다.

PyInstaller 예시:

```bash
pyinstaller --onefile --name todo-bridge python/todo_bridge.py
```

Electron main process의 `python:run` IPC 핸들러가 이 실행 파일을 호출합니다.
