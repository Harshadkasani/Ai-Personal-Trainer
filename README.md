# FitAI – AI Personal Trainer (React + Vite + Redux Toolkit)

## 1. Install
```bash
npm install
```
## 2. Run
```bash
npm run dev      # http://localhost:5173
npm run build    # production build in /dist
```
## 3. Folder structure
- `pages/` – one file per screen (Landing, ProfileSetup, Dashboard, WorkoutPlan, WorkoutDetails, Exercises, Progress, Nutrition, Profile, Settings)
- `components/` – reusable UI (StatCard, ProgressRing, WeightChart, Loader, ToastContainer, RequireProfile)
- `layouts/AppLayout.jsx` – sidebar + top bar shared by all `/app/*` pages
- `redux/` – `store.js` and `slices/` (userProfile, workout, progress, nutrition, ui)
- `services/` – `aiService.js` (the swap point) and `mockPlanBuilder.js` (mock logic)
- `data/exercises.js` – exercise library · `utils/helpers.js` – calorie/streak/date helpers · `hooks/useCountdown.js` – rest timer

## 4. Redux flow
1. Setup form → `setProfile(profile)` saves the profile.
2. `generateWorkout(profile)` (async thunk) calls `generateWorkoutPlan()` and stores the 7-day plan (`status` = loading → idle).
3. Workout page → `completeExercise()` increments sets; when all sets are done the day is marked finished and added to `history`.
4. Progress page → `updateWeight()` / `updateProgress()`; Nutrition → `addIntake()` / `addWater()`.
5. `store.js` saves state to LocalStorage on every change and reloads it on start. `resetWorkout()` clears the plan.

## 5. Replace the mock AI with a real API
Edit only `src/services/aiService.js`. Call **your own backend endpoint** (e.g. a Vercel serverless function in `/api/generate-plan`) that holds the AI provider key as a server environment variable and returns the same DayPlan JSON shape (documented in the file). Never put API keys in React code or `VITE_` variables.

## 6. Deploy to Vercel
1. Push the project to GitHub.
2. On vercel.com choose **Add New → Project**, import the repo (Framework: Vite, build `npm run build`, output `dist`).
3. Click **Deploy**. `vercel.json` already rewrites all routes to `index.html` so React Router works on refresh.
(Or: `npm i -g vercel && vercel` from the project folder.)
