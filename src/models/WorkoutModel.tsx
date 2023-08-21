export interface Exercise {
  date: string;
  id: string;
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
