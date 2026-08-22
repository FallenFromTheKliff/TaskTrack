# TaskTrack

A mobile task management application built with React Native and Expo, focused on organizing tasks, tracking progress, reviewing task history, and managing personal preferences through a structured, customizable interface.

## Features

- **Task Management**
  - Create, edit, complete, and remove tasks.
  - Assign priorities, dates, descriptions, notes, and optional icons.
  - Support indefinite and timed task durations.
  - View tasks by date and filter them by priority and status.

- **Task History**
  - Record task lifecycle events including creation, edits, completion, deletion, unfinished tasks, and trash actions.
  - Search and filter historical records.
  - Review task details from recorded events.

- **Trash & Recovery**
  - Move tasks to a dedicated trash view instead of immediately removing them.
  - Restore previously trashed tasks.
  - Automatically retain trash and unfinished-task records for 30 days.

- **Authentication & Profiles**
  - Local registration and login flow.
  - Profile management for username, name, email, phone number, date of birth, gender, password, and profile picture.
  - Logout and account deletion support.

- **Personalization**
  - Theme customization.
  - Font selection with bundled font families.
  - Configurable interface animations.
  - Customizable active icon and text colors.

- **Search & Filtering**
  - Search tasks, history, and trash records.
  - Filter tasks by priority.
  - Filter history by lifecycle status.
  - Filter trash by pending deletion or unfinished status.
  - Date-range filtering where applicable.

- **Responsive Interface**
  - React Native interface with web support through React Native Web.
  - Animated navigation, cards, forms, transitions, and progress indicators.
  - Native camera and image-picker integration for profile pictures.

## Technology Stack

### Core
- Expo SDK 54
- React 19
- React Native 0.81
- TypeScript 5.9

### Navigation & Forms
- React Navigation
- React Hook Form

### Storage & Device APIs
- AsyncStorage
- Expo Camera
- Expo Image Picker
- Expo Font
- Expo Crypto
- Expo Vector Icons

### Platform Support
- React DOM
- React Native Web

## Requirements

- Node.js
- npm
- Expo CLI / Expo development environment
- A supported Expo target such as:
  - Android
  - iOS
  - Web

The project uses Expo SDK 54, React Native 0.81, React 19, and TypeScript 5.9.

## Installation

Clone the repository and install the project dependencies:

```bash
git clone <repository-url>
cd TaskTrack
npm install
```

## Running the Application

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

The available scripts are defined in `package.json` and use Expo to launch the corresponding development environment.

## Data Storage

TaskTrack uses `@react-native-async-storage/async-storage` for local persistence.

User accounts, task data, task history, and the active user session are stored locally on the device. Task and history storage is scoped to the authenticated user's ID.

The application does not expose a remote API or external database in the current implementation represented by this repository export.

## Application Structure

The application is organized around React Context providers, reusable components, screens, hooks, utilities, and style modules.

```text
TaskTrack/
├── App.tsx
├── index.ts
├── app.json
├── package.json
├── tsconfig.json
├── assets/
│   ├── fonts/
│   └── expoImages/
└── src/
    ├── components/
    │   ├── cards/
    │   ├── fields/
    │   ├── layout/
    │   ├── main/
    │   └── modals/
    ├── contexts/
    │   ├── AuthContext.tsx
    │   ├── HistoryContext.tsx
    │   ├── ScreenContext.tsx
    │   ├── TaskContext.tsx
    │   └── ThemeContext.tsx
    ├── hooks/
    ├── screens/
    │   ├── auth/
    │   ├── interlude/
    │   └── main/
    ├── styles/
    └── utils/
```

## Application Architecture

The root application establishes the following provider hierarchy:

```text
ThemeProvider
└── AuthProvider
    └── HistoryProvider
        └── TaskProvider
            └── ScreenProvider
                └── Application Navigation
```

### Authentication

`AuthContext` manages:

- User registration
- Login state
- Profile updates
- Password changes
- Logout
- Account deletion
- Current-user persistence

### Task State

`TaskContext` manages the active task collection and exposes operations for:

- Creating tasks
- Updating tasks
- Completing tasks
- Moving tasks to trash
- Restoring tasks
- Filtering tasks by date
- Clearing task data

### History State

`HistoryContext` maintains task lifecycle records and handles:

- History persistence
- Event creation
- Event deletion
- Permanent deletion records
- Task restoration
- Unfinished-task reconciliation
- 30-day retention for trash and unfinished records

### Screen State

`ScreenContext` coordinates the primary application sections:

```text
Tasks
History
Trash Bin
Settings
Profile
```

## Task Lifecycle

Tasks follow a lifecycle that separates active work from historical records:

```text
Create
  │
  ▼
Active Task
  │
  ├── Edit ───────────────► History: Edited
  │
  ├── Complete ───────────► History: Completed
  │
  ├── Overdue ────────────► History: Unfinished
  │
  └── Move to Trash ──────► Trash
                              │
                              ├── Restore ──► Active Task
                              │
                              └── Retain for 30 days
```

Historical records can be searched and filtered independently from the active task collection.

## Configuration

Expo configuration is maintained in `app.json`.

The current configuration includes:

- Portrait orientation
- New Architecture enabled
- Custom application icon and splash assets
- iOS tablet support
- Android adaptive icon configuration
- Web favicon
- Expo Font integration
- Expo Camera integration

Camera access is configured specifically for taking profile pictures, with microphone access disabled.

## TypeScript

TypeScript is configured in strict mode with the `@/*` path alias mapped to `src/*`.

Example:

```ts
import { useTheme } from '@/contexts/ThemeContext';
import TaskCard from '@/components/cards/TaskCard';
```

## Development

The current project is structured as a single Expo application. Development can be performed directly against the Expo development server using the platform-specific scripts described above.

For changes to application behavior, the primary areas of the codebase are:

- `src/contexts/` for application state and persistence
- `src/screens/` for screen-level behavior
- `src/components/` for reusable UI
- `src/hooks/` for reusable stateful logic
- `src/styles/` for presentation and design tokens
- `src/utils/` for shared utilities and validation

## Project Status

TaskTrack is on version `1.4.0`.

The repository represents a complete application implementation centered on local task management, user profiles, task history, trash/recovery, and interface personalization.
