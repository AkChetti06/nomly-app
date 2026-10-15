import React from "react";
import { createRoot } from "react-dom/client";
import "./App.css";

const root = createRoot(document.getElementById("root"));
const requiredFirebaseSettings = [
  "VITE_FIREBASE_API_KEY",
  "VITE_FIREBASE_AUTH_DOMAIN",
  "VITE_FIREBASE_PROJECT_ID",
  "VITE_FIREBASE_APP_ID",
];
const configuration = import.meta.env;
const missing = requiredFirebaseSettings.filter((name) => !configuration[name]);

function showStartupError(message) {
  root.render(
    <main style={{ maxWidth: 560, margin: "12vh auto", padding: 28, fontFamily: "system-ui", lineHeight: 1.6 }}>
      <h1>Nomly needs a little setup</h1>
      <p>{message}</p>
      <p>Please check the Firebase web app environment variables in your Vercel project settings and redeploy the preview.</p>
      <p>Do not paste API credentials or private keys into screenshots or public GitHub issues.</p>
    </main>
  );
}

if (missing.length) {
  console.error("Missing Firebase configuration fields:", missing.join(", "));
  showStartupError("Firebase configuration is missing from this deployment.");
} else {
  import("./App.jsx")
    .then(({ default: App }) => root.render(<App />))
    .catch((error) => {
      console.error("Nomly startup error:", error);
      showStartupError("Nomly couldn't start. Open your browser developer console for technical details.");
    });
}
