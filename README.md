# FlytBase AI-Native Operator Experience Prototype

This project is a high-fidelity React application designed to demonstrate an AI-native operator experience for autonomous drone security systems. It focuses on the "Alert → Assessment → Response → Evidence" workflow.

## Features

### Phase 1: Intelligent Alert (0-60s)
- **Simulated Monitoring**: The system starts in a "Monitoring" state.
- **Auto-Escalation**: After 3 seconds, a simulated intrusion triggers a "Red Alert" state.
- **Drone Status**: Visualizes the autonomous launch and pre-flight checks of drone interceptors.

### Phase 2: active Response (60s - 5min)
- **Tactical Map**: A central command view showing drone positions and the intruder target.
- **AI Mission Control**: A side panel where the "AI Teammate" suggests actions (e.g., "Deploy Drone 2").
- **Live Feeds**: Picture-in-Picture (PiP) view of the drone's camera feed.

### Phase 3: Evidence & Documentation
- **Automated Reporting**: A summary screen generated after the incident.
- **Timeline**: Auto-generated log of key events (Detection, Launch, Arrival).
- **Evidence Package**: Preview of captured video clips and flight logs.

## Setup & Running

### Prerequisites
- Node.js (v18 or higher)
- npm

### Installation
1.  Open your terminal in the project directory.
2.  Install dependencies:
    ```bash
    npm install
    ```

### Development Server
To start the application in development mode:
```bash
npm run dev
```
Open your browser and navigate to the URL shown (usually `http://localhost:5173`).

### Building for Production
To build the application for deployment:
```bash
npm run build
```

## Tech Stack
- **Framework**: React (Vite)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
