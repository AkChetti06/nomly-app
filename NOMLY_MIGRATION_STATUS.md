# Nomly repository refresh — in progress

The repository's original `main` branch contains an older prototype with simulated login and hardcoded placeholder restaurant listings.

This review branch adds conservative dietary/cuisine filtering, removes unverified restaurant suggestions from the recommendation results and adds local prototype persistence.

**This is not yet the complete current ZIP import.** The current user-provided application includes Firebase auth, onboarding and more files which must replace the older prototype prior to a production release.

Do not merge or deploy this branch as a complete replacement until Firebase auth, dependencies, source paths and end-to-end flows have been integrated and tested.

Never commit `.env.local`, Firebase admin credentials, `node_modules` or `.vercel` metadata.
