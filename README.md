# VibeTodo

여러 프로젝트의 바이브 코딩 TODO와 진행 상황을 관리하는 Electron 데스크톱 앱입니다.

## 실행

```bash
npm install
npm start
```

## 기능

- 여러 프로젝트와 프로젝트별 TODO 파일 관리
- TODO 상태, 우선순위, 예상 시간 관리
- 프로젝트 진행률과 다음 작업 표시
- JSON 백업 및 복원
- Electron IPC 기반 Python 브리지 확장 구조

## 빌드

```bash
npm run build:win
npm run build:mac
npm run build:linux
```

Python 기능은 `python/dist`에 PyInstaller 실행 파일을 추가한 뒤 Electron IPC로 호출할 수 있습니다.
