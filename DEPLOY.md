# Deploying NextChapter to Netlify

You can deploy your Vite + Firebase application to Netlify using two main methods: **Drag & Drop** (easiest) or **Git Integration** (automatic).

## Prerequisites

1.  **Build your project**:
    Run the following command in your terminal to create the production-ready `dist` folder.
    ```bash
    npm run build
    ```
    *This creates a `dist` folder containing your website.*

## Method 1: Drag & Drop (Easiest)

1.  **Go to Netlify Drop**: Open [https://app.netlify.com/drop](https://app.netlify.com/drop).
2.  **Locate your `dist` folder**: Open your project folder (`c:\APPS BY AI\NextChapter 2`) in File Explorer.
3.  **Upload**: Drag and drop the **`dist`** folder (NOT the entire project folder) onto the Netlify page.
4.  **Wait**: Netlify will upload and deploy immediately.

## Method 2: Git Integration (Recommended for longer term)

1.  Push your code to GitHub.
2.  Log in to Netlify and click **"Add new site"** > **"Import from an existing project"**.
3.  Select **GitHub** and choose your repository.
4.  **Build Settings**:
    *   **Build command**: `npm run build`
    *   **Publish directory**: `dist`
5.  Click **Deploy Site**.

## CRITICAL STEP: Environment Variables

Since your app uses Firebase and Gemini, strictly **REQUIRED** for the app to work:

1.  Go to your new site's dashboard on Netlify.
2.  Navigate to **Site settings** > **Configuration** > **Environment variables**.
3.  Click **Add a variable** or **Import from .env**.
4.  Open your local `.env` file and **COPY EVERY KEY-VALUE PAIR** into Netlify.
    *   Example: Key: `VITE_FIREBASE_API_KEY`, Value: `your-key-here`
    *   *Do this for all `VITE_` variables.*
5.  **Re-deploy**: If you added variables *after* the deployment started, you must trigger a new deploy (Deploys > Trigger deploy > Clear cache and deploy site) for them to take effect.

## Post-Deployment Check

*   **Routing**: If refreshing a page (like `/pathfinder`) gives a 404 error, you need a `_redirects` file.
    *   Create a file named `public/_redirects` (no extension).
    *   Add this line: `/*  /index.html  200`
    *   Re-build and re-deploy.
