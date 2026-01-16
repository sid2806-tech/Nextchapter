# NextChapter
Student-centric web application powered by AI.

## How to Run

### Method 1: The Easy Way (Batch Script)
Double-click `start_app.bat` in the project folder.

### Method 2: Standard (Terminal)
Open your terminal (VS Code or Command Prompt) and run:
```bash
npm run dev
```

### Method 3: Direct Mode (If permissions fail)
If PowerShell blocks scripts, use this command:
```bash
node "node_modules/vite/bin/vite.js"
```

### Method 4: Production Preview
To simulate the final optimized build:
```bash
npm run build
npm run preview
```

## Setup
Ensure you have added your API keys to `.env`:
- `VITE_GEMINI_API_KEY` (For AI)
- `VITE_FIREBASE_...` (For Login/Database)
