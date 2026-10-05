import { buildMockPlan } from './mockPlanBuilder';

/**
 * generateWorkoutPlan(userProfile) -> Promise<Array<DayPlan>>
 *
 * Right now this uses local mock logic. To use a real AI API later,
 * replace the body with a call to YOUR OWN backend (never put API keys in frontend code):
 *
 *   const res = await fetch('/api/generate-plan', {
 *     method: 'POST',
 *     headers: { 'Content-Type': 'application/json' },
 *     body: JSON.stringify(userProfile),
 *   });
 *   if (!res.ok) throw new Error('Plan generation failed');
 *   return await res.json();   // must match the DayPlan shape below
 *
 * DayPlan = { day, rest, title, minutes, exercises: [{ id, name, muscle, sets, reps, rest, difficulty, tip }] }
 */
export async function generateWorkoutPlan(userProfile) {
  await new Promise((r) => setTimeout(r, 1800)); // fake network delay to show the loading state
  return buildMockPlan(userProfile);
}
