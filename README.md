# 💊 메디패스 (MediPass) — Frontend

> **약 때문에, 여행을 망설이지 않도록.**
>
> _"복용 중인 약의 해외 반입 준비를 한곳에서."_

약 봉투를 촬영해 **복약 카드**를 만드는 것을 넘어,
여행 국가에 따른 **의약품 반입 정보 · 준비 체크리스트 · 증빙 서류 관리**까지 제공하는 해외여행 의약품 관리 서비스의 프론트엔드입니다.

**React + TypeScript + Vite** 기반의 모바일 웹 앱으로,
**카카오 소셜 로그인**, **약 봉투 AI 스캔**, **국가별 반입 준비**, **여행 중 긴급 대응**을 담당합니다.

---

## 🔹 주요 기능

### 1. 🔐 인증
- 카카오 OAuth 소셜 로그인
- JWT 기반 인증 상태 관리 (`Zustand Persist` 토큰 저장)
- 서비스 이용 전 온보딩 및 약관 동의

### 2. 💳 약 스캔 & 복약 카드
- 카메라 촬영 또는 이미지 업로드를 통한 **약 봉투 AI 스캔**
- AI 인식 결과 확인 및 의약품 정보 수정·직접 입력
- 등록한 의약품의 **한글 / 영문 복약 카드** 조회
- 복용량, 복용 횟수, 처방 기관 및 조제일 관리

### 3. ✈️ 여행 준비 & 반입 체크로그
- 출발지·목적지 공항 및 여행 기간 등록
- 여행에 가져갈 의약품 선택
- 목적지 국가별 의약품 반입 정보 조회
- 여행별 목적지 규정 및 준비 체크리스트 관리

의약품 반입 준비 상태는 다음 3단계로 안내됩니다.

| 단계 | 내용 |
|---|---|
| ✅ **반입 가능(ALLOWED)** | 별도 제한 없이 반입 가능한 의약품 |
| 📄 **서류 준비 필요(PREP_REQUIRED)** | 처방전 등 추가 서류 준비가 필요한 의약품 |
| ⛔ **반입 제한(NOT_ALLOWED)** | 반입이 제한되거나 관계 기관 확인이 필요한 의약품 |

### 4. 📁 서류함 & 긴급 도움
- 처방전·의사 소견서·반입 허가서 등 **의약품별 증빙 서류** 관리
- 전체 서류 등록 현황 및 상세 내용 조회
- 여행 중 의약품 분실·부족 등 상황별 대응 안내
- 현재 위치를 기반으로 관련 기관 연락처 조회
- 현지에서 사용할 수 있는 **긴급 설명문 번역** 제공

---

## 🚀 기술 스택

- **Language**: TypeScript 6

  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" />

- **Framework**: React 19

  <img src="https://img.shields.io/badge/React%2019-61DAFB?style=flat-square&logo=react&logoColor=black" />

- **빌드 도구**: Vite 8

  <img src="https://img.shields.io/badge/Vite%208-646CFF?style=flat-square&logo=vite&logoColor=white" />

- **스타일링**: Tailwind CSS 4 + Pretendard

  <img src="https://img.shields.io/badge/Tailwind%20CSS%204-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" />

- **라우팅**: React Router DOM 7

  <img src="https://img.shields.io/badge/React%20Router%207-CA4245?style=flat-square&logo=reactrouter&logoColor=white" />

- **서버 상태 관리**: TanStack Query v5

  <img src="https://img.shields.io/badge/TanStack%20Query-FF4154?style=flat-square&logo=reactquery&logoColor=white" />

- **클라이언트 상태 관리**: Zustand v5

  <img src="https://img.shields.io/badge/Zustand-443E38?style=flat-square&logo=zustand&logoColor=white" />

- **HTTP 통신**: Axios 1.18

  <img src="https://img.shields.io/badge/Axios-5A29E4?style=flat-square&logo=axios&logoColor=white" />

- **인증**: Kakao OAuth + JWT

  <img src="https://img.shields.io/badge/Kakao%20Login-FFCD00?style=flat-square&logo=kakao&logoColor=black" />
  <img src="https://img.shields.io/badge/JWT-000000?style=flat-square&logo=jsonwebtokens&logoColor=white" />

- **영속 스토리지**: Zustand Persist (`localStorage`)

  <img src="https://img.shields.io/badge/localStorage-F7DF1E?style=flat-square&logo=javascript&logoColor=black" />

- **Linting / Formatting**: ESLint 10 + Prettier 3

  <img src="https://img.shields.io/badge/ESLint-4B32C3?style=flat-square&logo=eslint&logoColor=white" />
  <img src="https://img.shields.io/badge/Prettier-F7B93E?style=flat-square&logo=prettier&logoColor=black" />

---

## 🏗️ 아키텍처 개요

```scss
📱 Mobile Web App
    │  카카오 OAuth · JWT (Zustand Persist)
    ├─ React Router       (클라이언트 라우팅)
    ├─ TanStack Query     (서버 상태 · 캐싱)
    ├─ Zustand            (인증 · 전역 클라이언트 상태)
    ├─ Tailwind CSS       (UI 스타일링)
    └─ Axios              (API 통신)
          │
          ▼
    🌐 Server API
          ├─ OAuth 인증
          ├─ 의약품 · 여행 · 서류 관리
          └─ AI 약 봉투 인식 · 긴급 번역
```

---

## 📁 프로젝트 구조

```csharp
FE/
└─ src/
   ├─ pages/                  # 화면 및 도메인별 UI·서비스 로직
   │  ├─ login/               # 카카오 로그인
   │  ├─ oauth/               # OAuth 콜백 처리
   │  ├─ onboard/             # 온보딩 및 약관
   │  ├─ home/                # 복약 카드
   │  ├─ scan/                # 약 봉투 스캔 및 의약품 등록
   │  ├─ register/            # 여행 등록 및 반입 체크로그
   │  ├─ documents/           # 의약품 증빙 서류함
   │  ├─ emergency/           # 여행 중 긴급 도움
   │  └─ account/             # 계정 및 서비스 정보
   ├─ components/             # 공통 UI 컴포넌트
   ├─ apis/                   # 도메인별 API 요청
   ├─ routes/                 # React Router 라우팅 설정
   ├─ stores/                 # Zustand 전역 상태
   ├─ hooks/                  # 공통 커스텀 훅
   ├─ constants/              # 상수 및 정적 데이터
   ├─ types/                  # TypeScript 타입
   ├─ utils/                  # 공통 유틸리티
   ├─ styles/                 # 전역 스타일
   └─ assets/                 # 이미지 및 폰트
```
---

## 👥 팀 구성 (Backend)

<table>
  <tr>
    <td align="center" width="180">
      <a href="https://github.com/a-neey">
        <img src="https://github.com/a-neey.png" width="120" height="120" style="border-radius:50%" /><br/>
        <b>김예나</b>
      </a>
    </td>
    <td align="center" width="180">
      <a href="https://github.com/atelier-hs">
        <img src="https://github.com/atelier-hs.png" width="120" height="120" style="border-radius:50%" /><br/>
        <b>장현서</b>
      </a>
    </td>
  </tr>
  <tr>
    <td align="center">Frontend</td>
    <td align="center">Frontend</td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/a-neey">@a-neey</a></td>
    <td align="center"><a href="https://github.com/atelier-hs">@atelier-hs</a></td>
  </tr>
</table>
