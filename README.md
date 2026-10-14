# Nomly

Nomly is a food discovery and meal-budgeting prototype for international students near SUTD in Singapore.

## Run locally

1. Install Node.js 22 or newer.
2. Run `npm install`.
3. Copy `.env.example` to `.env.local`, and enter the six **Firebase web app** configuration values from Firebase Console > Project settings.
4. In Firebase Authentication enable Email/Password sign-in and authorize your local/deployment domain.
5. Run `npm run dev`.

## Validation

- `npm test`: utility regression tests
- `npm run build`: Vite production build

## Current limitations

- Food venues are not yet a verified live database. Unverified placeholders are excluded from recommendations.
- Grocery prices and walking times are estimates, not live verified data.
- Recipe helper is rule-based, not an AI API.
- Budgets and preferences are stored per Firebase user **in the current browser**, not synchronized through Firestore.
- Signup verifies an email and login requires verification; production Firebase setup must be tested on the deployed domain.
- Do not use allergy or religious-diet tags as certification without vendor confirmation.

## Safe deployment

Changes are prepared on a development branch and reviewed via a draft pull request. Do not merge or deploy until CI and end-to-end authentication tests pass.

Do not commit secrets, service-account credentials, local Firebase environment files or Vercel metadata.
