# VibeTodo 프로젝트 진행 TODO

> 목적: 여러 프로젝트의 Markdown TODO를 읽고 수정하며, Git 변경 이력과 개발 도구를 연결하는 개인용 바이브 코딩 작업 관리 프로그램을 만든다.

## 현재 상태

- [x] [medium] 기본 TODO 대시보드 구현
- [x] [medium] 여러 프로젝트 등록 및 전환
- [x] [medium] 프로젝트별 TODO 파일 탭 관리
- [x] [medium] Electron 데스크톱 앱 구조 구성
- [x] [medium] 프로젝트별 TODO 폴더 연결
- [x] [medium] Markdown TODO 파일 읽기
- [x] [medium] Markdown 체크박스 기반 TODO 표시
- [x] [medium] TODO 완료·수정·추가 내용을 원본 Markdown에 반영
- [x] [medium] TODO 폴더 Markdown 파일 수동 동기화 버튼
- [x] [medium] TODO 폴더에서 일반 Markdown 파일 필터링
- [x] [medium] 프로젝트 메인 TODO 파일은 일반 Markdown 필터링 예외 처리
- [x] [medium] 프로젝트 폴더에 메인 TODO 파일 자동 생성
- [x] [medium] 메인 TODO 파일을 파일 목록 최상단에 표시
- [x] [medium] 현재 Markdown 파일에 새 TODO 추가
- [x] [medium] TODO 보류 상태 추가
- [x] [medium] TODO 일시 입력·저장 기능 추가
- [x] [medium] TODO 파일별 완료 진행률 표시
- [x] [medium] 파일별 진행률을 진행 현황 목록으로 표시
- [x] [medium] GitHub 원격 저장소 및 브랜치 연결
- [x] [medium] 실제 Electron 설치·실행 환경 검증

## 1. Git 로그 연동

- [ ] [medium] 프로젝트 폴더의 Git 저장소 자동 감지
- [ ] [medium] 현재 브랜치와 원격 저장소 정보 표시
- [ ] [medium] 최근 Git 로그를 프로젝트 화면에 표시
- [x] [medium] TODO 파일별 관련 커밋 찾기
- [ ] [medium] TODO 항목의 파일 경로와 코드 라인 연결
- [x] [medium] 특정 줄의 마지막 수정 커밋 확인
- [x] [medium] 특정 줄의 작성자·수정 시각·커밋 메시지 표시
- [ ] [medium] 해당 줄의 변경 diff 열람
- [ ] [medium] TODO 완료 시 관련 커밋을 연결하거나 기록

## 2. 오늘 작업 상황판 대시보드

> 대시보드는 프로젝트 전체 통계 화면이 아니라, 사용자가 앱을 열었을 때 오늘 무엇을 해야 하는지 바로 판단하는 작업 상황판으로 만든다. 개발 TODO, 공통 일정, 개발 외 일정을 한 화면에서 관리한다.

### 대시보드 기본 화면

- [x] [medium] 금주 작업 현황판 전용 화면 구성
- [x] [medium] 월요일부터 금요일까지 요일별 작업 집계
- [x] [medium] 금주 작업·일정 목록 표시
- [x] [medium] 오늘 작업 상태와 유형 관리
- [x] [medium] 여러 프로젝트 현황 요약 표시
- [x] [medium] 목요일 오후·금요일 오전 주간 Git 활동 조회 화면
- [x] [medium] 직전 보고 기간 확인
- [x] [medium] 해당 기간 Git 커밋·변경 파일 확인
- [x] [medium] 프로젝트별 Git 커밋·변경 TODO 파일 조회
- [ ] [medium] 금요일 오전 자동 보고서 작성 알림
- [x] [medium] 프로젝트 메인 TODO를 대시보드에 연동
- [x] [medium] 대시보드에서 메인 TODO 상태 변경을 원본 파일에 반영
- [ ] [medium] 오늘 일정과 마감 임박 일정 표시
- [ ] [medium] 진행 중인 작업과 막힌 작업 표시
- [x] [medium] 여러 프로젝트의 오늘 작업을 하나의 목록으로 통합
- [x] [medium] 개발 외 일정과 개인 메모를 별도 유형으로 표시
- [x] [medium] 완료한 오늘 작업의 요약 표시
- [x] [medium] 프로젝트별 Markdown TODO 파일 진행 현황 표시
- [x] [medium] 파일별 전체 항목·완료 항목·완료율 표시
- [ ] [medium] 진행 중인 Markdown 파일을 상단에 우선 표시
- [ ] [medium] 파일별 다음 작업과 마지막 동기화 시각 표시
- [ ] [medium] 필요할 때만 프로젝트별 상세 화면으로 이동
- [x] [medium] 이번 주 일정과 프로젝트 진행률은 보조 영역에 표시
- [ ] [medium] 최근 Git 활동과 최근 수정 TODO는 하단 보조 영역에 표시

### 일정 관리

- [x] [medium] 공통 일정 등록·수정·삭제
- [x] [medium] 개발 외 일정 등록·수정·삭제
- [x] [medium] 일정 유형 구분: 공통 / 개발 / 개인 / 회의 / 기타
- [x] [medium] 일정별 날짜·메모 관리
- [x] [medium] 일정에 프로젝트 또는 TODO 연결
- [x] [medium] 완료·보류 상태 관리
- [ ] [medium] 캘린더 보기와 목록 보기 지원
- [ ] [medium] 일정 검색과 유형별 필터
- [ ] [medium] 마감 임박 알림과 오늘 일정 알림

### 대시보드 데이터 구조

- [ ] [medium] 일정 전용 Markdown 파일 형식 정의
- [ ] [medium] 일정과 프로젝트 데이터를 분리하면서 연결 정보 유지
- [ ] [medium] 일정 변경 시 원본 Markdown 저장
- [ ] [medium] 외부 Markdown 변경사항 동기화
- [x] [medium] 백업·복구에 일정 데이터 포함

## 3. 프로젝트·파일·코드 위치 관리

- [ ] [medium] 프로젝트별 소스 폴더 연결
- [ ] [medium] TODO 파일에서 파일 경로 링크 인식
- [ ] [medium] `파일경로:라인번호` 형식의 위치 파싱
- [ ] [medium] 앱에서 해당 파일과 줄을 빠르게 열기
- [ ] [medium] 변경된 파일과 아직 완료되지 않은 TODO를 함께 표시
- [ ] [medium] 프로젝트별 마지막 작업 위치 저장

## 4. 개발 프로그램 연동

### Codex

- [ ] [medium] Codex 작업 또는 대화 링크 저장
- [ ] [medium] TODO 항목에서 Codex 작업 열기
- [ ] [medium] Codex 작업 진행 상태를 TODO에 기록
- [ ] [medium] 작업 결과와 관련 커밋 연결

### VS Code

- [ ] [medium] VS Code 설치 경로 자동 감지
- [x] [medium] 프로젝트 폴더를 VS Code로 열기
- [ ] [medium] 특정 파일을 줄 번호와 함께 열기
- [ ] [medium] TODO 항목에서 바로 VS Code 실행

### Git

- [ ] [medium] Git 실행 파일 및 저장소 상태 확인
- [ ] [medium] 변경 파일·staged 파일·현재 브랜치 표시
- [ ] [medium] 앱에서 커밋·브랜치·diff 조회
- [ ] [medium] 필요한 경우 안전한 Git 명령 실행
- [ ] [medium] GitHub 원격 저장소와 브랜치 링크 표시

### JavaScript / Node.js

- [ ] [medium] Node.js 실행 환경 확인
- [ ] [medium] npm·pnpm·yarn 명령 감지
- [ ] [medium] 프로젝트의 테스트·린트·빌드 명령 표시
- [ ] [medium] 명령 실행 결과와 오류를 TODO에 연결

### Python

- [ ] [medium] Python 실행 환경 확인
- [ ] [medium] 가상환경 자동 감지
- [ ] [medium] Python 프로젝트의 테스트·스크립트 실행
- [ ] [medium] Python 결과를 Electron 화면에 표시
- [ ] [medium] 장시간 작업의 진행률·로그·중지 기능 추가

## 5. Python 자동화

- [ ] [medium] Python 브리지 프로토콜 확정
- [ ] [medium] Electron에서 Python 실행 파일 호출
- [ ] [medium] JSON 입력·출력 규격 정의
- [ ] [medium] 표준 출력·표준 오류·종료 코드 처리
- [ ] [medium] 작업별 실행 이력 저장
- [ ] [medium] 반복 작업을 자동화 스크립트로 등록
- [ ] [medium] 자동화 작업의 성공·실패 결과를 TODO에 반영
- [ ] [medium] PyInstaller 기반 배포 패키지 구성

## 6. 내부 인덱스 저장소(SQLite)

> Markdown과 Git을 원본으로 유지하고, SQLite는 탭 전환과 기간별 조회를 빠르게 하기 위한 앱 내부 캐시·인덱스로 사용한다.

- [ ] [medium] Electron 앱의 userData 경로에 SQLite DB 파일 구성
- [ ] [medium] 프로젝트·TODO 파일·TODO 항목 테이블 설계
- [ ] [medium] Git 커밋·파일 변경·TODO 줄 변경 정보 테이블 설계
- [ ] [medium] Markdown 동기화 시 SQLite 인덱스 갱신
- [ ] [medium] Git 로그 조회 시 SQLite에 커밋 정보 캐시
- [ ] [medium] 프로젝트·파일 탭 전환 시 DB 캐시 우선 조회
- [ ] [medium] 사용자가 동기화할 때만 원본 Markdown·Git 재조회
- [ ] [medium] 외부 파일 변경 및 캐시 만료 처리
- [ ] [medium] SQLite 마이그레이션·백업·초기화 정책 정의

## 7. 품질·사용성

- [ ] [medium] Markdown 원본 보존 테스트
- [ ] [medium] TODO 추가·수정·삭제 회귀 테스트
- [ ] [medium] Git 저장소가 없는 프로젝트 처리
- [ ] [medium] 권한이 없는 폴더 처리
- [ ] [medium] 파일 변경 감지 및 새로고침
- [ ] [medium] 백업·복구 기능 점검
- [ ] [medium] Windows 패키징 및 설치 테스트
- [ ] [medium] 사용 설명서 업데이트

## 진행 규칙

- 한 번에 하나의 TODO만 진행한다.
- 구현 직후 관련 동작을 검증한다.
- 완료한 TODO에는 실제 검증 결과를 남긴다.
- 작업 중 발견한 추가 요구사항은 임의로 섞지 않고 이 파일에 새 TODO로 추가한다.
- Git 연동 기능은 읽기 전용 조회부터 구현한 뒤 명령 실행 기능으로 확장한다.
