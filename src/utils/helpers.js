export const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

// JS getDay(): Sunday = 0. We want Monday = 0.
export const todayIndex = () => (new Date().getDay() + 6) % 7;

// Rough estimate of daily targets (Mifflin-St Jeor). Educational only.
export function calcTargets(p) {
  const bmr = 10 * p.weight + 6.25 * p.height - 5 * p.age + (p.gender === 'Male' ? 5 : p.gender === 'Female' ? -161 : -78);
  const tdee = bmr * (1.2 + 0.1 * p.days);
  const adjust = { 'Muscle Gain': 300, 'Weight Loss': -500, 'Fat Loss': -400, Strength: 100, 'General Fitness': 0 }[p.goal] ?? 0;
  const calories = Math.round(tdee + adjust);
  const protein = Math.round(p.weight * (['Muscle Gain', 'Strength', 'Fat Loss'].includes(p.goal) ? 2 : 1.8));
  const fat = Math.round((calories * 0.25) / 9);
  const carbs = Math.max(0, Math.round((calories - protein * 4 - fat * 9) / 4));
  const goalDelta = { 'Muscle Gain': 3, 'Weight Loss': -5, 'Fat Loss': -4 }[p.goal] ?? 0;
  return { calories, protein, fat, carbs, goalWeight: p.weight + goalDelta, water: 8 };
}

// Streak = consecutive days (ending today or yesterday) with a finished workout
export function calcStreak(history) {
  const days = new Set(history.map((h) => new Date(h.date).toDateString()));
  const d = new Date();
  if (!days.has(d.toDateString())) d.setDate(d.getDate() - 1);
  let streak = 0;
  while (days.has(d.toDateString())) { streak++; d.setDate(d.getDate() - 1); }
  return streak;
}

export const shortDate = (iso) => new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
