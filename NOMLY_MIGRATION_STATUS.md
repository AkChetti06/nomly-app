# Nomly migration status

The uploaded current Nomly ZIP is a more developed React/Vite/Firebase prototype than the previously committed GitHub main branch.

This development branch implements a **functional first-pass modernization** of the active `src/App.jsx`, rather than an exact file-for-file import of every file from the ZIP.

Completed in this branch:
- Firebase Authentication SDK setup with Vite environment variables
- Signup, email verification, login, verified-session restoration, logout
- Per-account local budget/preferences and history
- Dietary and cuisine exclusions in recommendations, with unverified venues hidden
- Basic regression tests and a proposed GitHub Actions CI workflow

Still to complete before production:
- Port all remaining current-ZIP UI, onboarding, and recipe improvements exactly
- Verify the build, GitHub CI and full signup/verification/login flow on Vercel
- Establish verified SUTD-area restaurant data, prices, dietary certifications, and travel times
- Replace the rule-based recipe assistant with a guarded server-side AI endpoint
- Add Firestore synchronization if multi-device storage is required

Do **not** merge this draft PR or assume the Vercel deployment is updated.
