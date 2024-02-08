export interface Exercise {
  id: number;
  genre?: string;
  name?: string;
  description: string;
}
export interface WorkoutExercise{
  sets: number;
  reps: number;
  weight: number;
  creationDate: string;
  lastUpdated: string;
}

export interface WorkoutExerciseList{
  exercise: Exercise;
  id: number;
  sets: number;
  reps: number;
  weight: number;
  creationDate: string;
  lastUpdated: string;
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
