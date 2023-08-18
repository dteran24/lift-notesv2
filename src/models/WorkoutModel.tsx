export interface Exercise {
  date: string;
  genre: string;
  id: number;
  name: string;
  notes: string;
  reps: number;
  sets: number;
  weight: number;
}

export interface WorkoutCategory {
  genre: string;
  workouts: Exercise[];
}

export interface WorkoutData {
  Workouts: WorkoutCategory[];
}
