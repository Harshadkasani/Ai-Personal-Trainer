import { EXERCISES, TIER_DIFFICULTY } from '../data/exercises';
import { DAYS } from '../utils/helpers';

// Which equipment tiers each choice unlocks
const ALLOWED = {
  'No equipment': ['bw'],
  Dumbbells: ['bw', 'db'],
  Barbell: ['bw', 'db', 'bb'],
  Machines: ['bw', 'mc'],
  'Full Gym': ['bw', 'db', 'bb', 'mc'],
};
// Weekdays (0 = Monday) used for each "days per week" choice
const SCHEDULE = { 2: [0, 3], 3: [0, 2, 4], 4: [0, 1, 3, 4], 5: [0, 1, 2, 4, 5], 6: [0, 1, 2, 3, 4, 5] };
const SESSIONS = {
  push: { title: 'Push', muscles: ['chest', 'shoulders', 'triceps'] },
  pull: { title: 'Pull', muscles: ['back', 'biceps', 'core'] },
  legs: { title: 'Legs + Core', muscles: ['legs', 'core'] },
  upper: { title: 'Upper Body', muscles: ['chest', 'back', 'shoulders', 'biceps', 'triceps'] },
  lower: { title: 'Lower Body', muscles: ['legs', 'core'] },
  full: { title: 'Full Body', muscles: ['legs', 'chest', 'back', 'shoulders', 'core'] },
};
const SPLITS = {
  2: ['full', 'full'], 3: ['full', 'full', 'full'], 4: ['upper', 'lower', 'upper', 'lower'],
  5: ['push', 'pull', 'legs', 'upper', 'lower'], 6: ['push', 'pull', 'legs', 'push', 'pull', 'legs'],
};
const GOAL_SCHEME = {
  'Muscle Gain': { sets: 4, reps: '8-10', rest: 90 },
  Strength: { sets: 5, reps: '5', rest: 150 },
  'Weight Loss': { sets: 3, reps: '12-15', rest: 45 },
  'Fat Loss': { sets: 3, reps: '12-15', rest: 45 },
  'General Fitness': { sets: 3, reps: '10-12', rest: 60 },
};

export function buildMockPlan(p) {
  const allowed = ALLOWED[p.equipment] || ['bw'];
  const injury = (p.injuries || '').toLowerCase();
  const scheme = GOAL_SCHEME[p.goal] || GOAL_SCHEME['General Fitness'];
  const sets = p.experience === 'Beginner' ? Math.max(2, scheme.sets - 1) : scheme.sets;
  const count = Math.min(8, Math.max(3, Math.round(p.duration / 10))); // ~10 min per exercise
  const days = Math.min(6, Math.max(2, p.days));
  const trainDays = SCHEDULE[days];

  // Pool = right equipment and nothing that stresses an injured joint the user mentioned
  const pool = EXERCISES.filter((e) => allowed.includes(e.tier) && !(e.avoid && injury.includes(e.avoid)));

  return DAYS.map((day, dayIndex) => {
    const slot = trainDays.indexOf(dayIndex);
    if (slot === -1) return { day, rest: true, title: 'Rest', exercises: [], minutes: 0 };
    const session = SESSIONS[SPLITS[days][slot]];
    const used = new Set();
    const exercises = [];
    for (let i = 0; exercises.length < count && i < count * 3; i++) {
      const muscle = session.muscles[i % session.muscles.length];
      // Higher-tier lifts first; rotate with `slot` for variety between days
      const options = pool.filter((e) => e.muscle === muscle && !used.has(e.id)).sort((a, b) => 'bw db mc bb'.indexOf(b.tier) - 'bw db mc bb'.indexOf(a.tier));
      const pick = options[slot % Math.max(options.length, 1)];
      if (!pick) continue;
      used.add(pick.id);
      const isCore = pick.muscle === 'core';
      exercises.push({
        id: pick.id, name: pick.name, muscle: pick.muscle, tip: pick.tip,
        sets: isCore ? 3 : sets, reps: isCore ? '30-45s / 12' : scheme.reps, rest: scheme.rest,
        difficulty: TIER_DIFFICULTY[pick.tier],
      });
    }
    const minutes = Math.round(exercises.reduce((t, e) => t + e.sets * (45 + e.rest), 0) / 60) + 5;
    return { day, rest: false, title: session.title, exercises, minutes };
  });
}
