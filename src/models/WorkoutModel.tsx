import WorkoutList from "../components/WorkoutList";

export interface WorkoutItem {
  WorkoutName: String;
  Reps: Number;
  Sets: Number;
  Weight: Number;
  Notes: String;
  Date: String;
}
export interface WorkoutList {
  Chest: WorkoutItem[];
  Shoulders: WorkoutItem[];
  Back: WorkoutItem[];
  Arms: WorkoutItem[];
  Legs: WorkoutItem[];
}
