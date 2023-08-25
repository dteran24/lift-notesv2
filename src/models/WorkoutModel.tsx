export interface Exercise {
  genre: string;
  date: string;
  id: string;
  name: string;
  notes: string;
  reps: number;
  sets: number;
  weight: number;
  history: ExerciseHistory[];
}
export interface ExerciseHistory{
  date: string;
  notes: string;
  reps: number;
  sets: number;
  weight: number;
}
export interface WorkoutCategory {
  genre: string;
  workouts: Exercise[];
}
