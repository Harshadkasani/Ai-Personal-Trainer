// [name, muscle, equipment tier, instructions, joint to avoid if injured]
// Equipment tiers: bw = bodyweight, db = dumbbells, bb = barbell, mc = machines/cables
const raw = [
  ['Push-Up', 'chest', 'bw', 'Hands under shoulders, body in a straight line. Lower your chest to the floor, then press back up.', 'shoulder'],
  ['Decline Push-Up', 'chest', 'bw', 'Feet on a chair. Lower slowly with elbows at 45° and press up.', 'shoulder'],
  ['Dumbbell Bench Press', 'chest', 'db', 'Lie on a bench, lower dumbbells to chest level, press up without locking elbows.', 'shoulder'],
  ['Incline Dumbbell Press', 'chest', 'db', 'Bench at 30°. Press dumbbells up and slightly together over upper chest.', 'shoulder'],
  ['Barbell Bench Press', 'chest', 'bb', 'Grip slightly wider than shoulders. Lower bar to mid-chest, drive it up.', 'shoulder'],
  ['Machine Chest Press', 'chest', 'mc', 'Adjust seat so handles are at chest height. Press forward, return slowly.', ''],
  ['Cable Fly', 'chest', 'mc', 'Slight elbow bend. Bring handles together in a hugging arc and squeeze.', 'shoulder'],
  ['Inverted Row', 'back', 'bw', 'Lie under a sturdy table, grip the edge and pull your chest up to it.', ''],
  ['Superman Hold', 'back', 'bw', 'Lie face down, lift arms and legs, hold 2 seconds, lower slowly.', 'back'],
  ['One-Arm Dumbbell Row', 'back', 'db', 'Hand and knee on a bench. Pull the dumbbell to your hip, keep your back flat.', ''],
  ['Barbell Bent-Over Row', 'back', 'bb', 'Hinge at hips, flat back. Pull the bar to your lower ribs.', 'back'],
  ['Lat Pulldown', 'back', 'mc', 'Pull the bar to upper chest, driving elbows down. Control the return.', ''],
  ['Seated Cable Row', 'back', 'mc', 'Sit tall, pull handle to your waist, squeeze shoulder blades.', ''],
  ['Bodyweight Squat', 'legs', 'bw', 'Feet shoulder-width, sit back and down until thighs are parallel, then stand.', 'knee'],
  ['Reverse Lunge', 'legs', 'bw', 'Step back, lower the back knee toward the floor, push through the front heel.', 'knee'],
  ['Glute Bridge', 'legs', 'bw', 'On your back, knees bent. Drive hips up, squeeze glutes at the top.', ''],
  ['Goblet Squat', 'legs', 'db', 'Hold one dumbbell at your chest. Squat deep with chest tall.', 'knee'],
  ['Dumbbell Romanian Deadlift', 'legs', 'db', 'Soft knees, push hips back, lower dumbbells along your legs, then stand.', 'back'],
  ['Barbell Back Squat', 'legs', 'bb', 'Bar on upper back. Brace your core, squat to parallel, drive up.', 'knee'],
  ['Leg Press', 'legs', 'mc', 'Feet shoulder-width on the platform. Lower until knees are about 90°, press.', 'knee'],
  ['Leg Curl', 'legs', 'mc', 'Curl the pad toward your glutes, pause, return slowly.', ''],
  ['Pike Push-Up', 'shoulders', 'bw', 'Hips high in an inverted V. Lower your head toward the floor, press back.', 'shoulder'],
  ['Dumbbell Shoulder Press', 'shoulders', 'db', 'Press dumbbells overhead from shoulder height without arching your back.', 'shoulder'],
  ['Lateral Raise', 'shoulders', 'db', 'Raise dumbbells out to shoulder height with a slight elbow bend.', ''],
  ['Barbell Overhead Press', 'shoulders', 'bb', 'Squeeze glutes, press the bar straight up, head moves through at the top.', 'shoulder'],
  ['Machine Shoulder Press', 'shoulders', 'mc', 'Press handles overhead, lower under control.', 'shoulder'],
  ['Isometric Towel Curl', 'biceps', 'bw', 'Pull a towel apart as if curling while resisting with the other hand. Hold 10 s.', ''],
  ['Dumbbell Curl', 'biceps', 'db', 'Elbows pinned to your sides. Curl up, squeeze, lower slowly.', ''],
  ['Barbell Curl', 'biceps', 'bb', 'Shoulder-width grip. Curl without swinging your torso.', ''],
  ['Cable Curl', 'biceps', 'mc', 'Keep elbows still and curl the handle to your shoulders.', ''],
  ['Bench Dip', 'triceps', 'bw', 'Hands on a bench behind you. Lower until elbows reach 90°, press up.', 'shoulder'],
  ['Diamond Push-Up', 'triceps', 'bw', 'Hands form a diamond under your chest. Lower and press, elbows close.', 'shoulder'],
  ['Overhead Dumbbell Extension', 'triceps', 'db', 'Hold one dumbbell overhead, lower behind your head, extend.', 'shoulder'],
  ['Close-Grip Bench Press', 'triceps', 'bb', 'Hands shoulder-width on the bar. Lower to lower chest, press up.', 'shoulder'],
  ['Tricep Pushdown', 'triceps', 'mc', 'Elbows at your sides. Push the handle down until arms are straight.', ''],
  ['Plank', 'core', 'bw', 'Forearms on the floor, body in a straight line. Hold, breathing steadily.', ''],
  ['Dead Bug', 'core', 'bw', 'On your back, extend opposite arm and leg slowly while your lower back stays flat.', ''],
  ['Cable Crunch', 'core', 'mc', 'Kneel at a cable, crunch your ribs toward your hips.', 'back'],
];

export const EXERCISES = raw.map(([name, muscle, tier, tip, avoid], i) => ({
  id: `ex${i}`, name, muscle, tier, tip, avoid,
}));

export const MUSCLE_ICONS = { chest: '🏋️', back: '🧗', legs: '🦵', shoulders: '🤸', biceps: '💪', triceps: '💪', core: '🧘' };
export const TIER_DIFFICULTY = { bw: 'Beginner', mc: 'Beginner', db: 'Intermediate', bb: 'Advanced' };
