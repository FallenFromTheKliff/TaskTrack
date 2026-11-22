<h1 align="center">
    <img src="assets/images/TaskTrackTitle.png" alt="TaskTrack" width="30%" />
</h1>

> TaskTrack is a mobile Task Management Application built with React Native and Expo, focused on managing, tracking, and reviewing tasks. This project doubles as development practice in using TypeScript and Expo for mobile development.

---

## TECH STACK

| Category | Technologies |
|---|---|
| **Languages** | ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white) |
| **Frontend Development** | ![Expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white) ![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black) ![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) |
| **Tools & Build** | ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white) ![npm](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white) |

---

## PROJECT STRUCTURE

```text
TaskTrack/
├── assets/
│   ├── fonts/
│   └── expoImages/
│
├── src/
│   ├── components/
│   │   ├── cards/
│   │   ├── fields/
│   │   │   ├── common/
│   │   │   └── forms/
│   │   ├── layout/
│   │   ├── main/
│   │   ├── modals/
│   │   └── requirements/
│   │
│   ├── contexts/
│   │
│   ├── hooks/
│   │   ├── animations/
│   │   ├── auth/
│   │   ├── cards/
│   │   └── main/
│   │       └── sections/
│   │
│   ├── screens/
│   │   ├── auth/
│   │   ├── interlude/
│   │   └── main/
│   │       ├── generic/
│   │       └── sections/
│   │
│   ├── styles/
│   │   ├── auth/
│   │   ├── cards/
│   │   ├── components/
│   │   ├── screens/
│   │   └── shared/
│   │
│   └── utils/
│       ├── auth/
│       └── shared/
│
├── App.tsx
├── index.ts
├── app.json
├── package.json
├── package-lock.json
└── tsconfig.json
```

---

## GETTING STARTED

### Prerequisites

| Requirement | Details |
|---|---|
| Node.js | LTS recommended |
| npm | Included with Node.js |
| Expo Go | For physical device testing |
| Web Browser | For running the web version |

### 1. Clone the repository

```bash
git clone <repository-url>
cd TaskTrack
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the application

Start the Expo development server:

```bash
npm start
```

Run directly on the available target:

```bash
npm run android
npm run ios
npm run web
```

The application can be launched on Android, iOS, and web through the corresponding Expo development commands.

---

## LICENSE

This project is unlicensed, even I wouldn't try anything **too** crazy.

---