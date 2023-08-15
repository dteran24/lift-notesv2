export interface Exercise {
    id: number;
    WorkoutName: string;
    Reps: number;
    Sets: number;
    Weight: number;
    Notes: string;
    Date: string; // You can use a specific Date type library if needed
}

export interface WorkoutCategory {
    Category: string;
    Exercises: Exercise[];
}

export interface WorkoutData {
    Workouts: WorkoutCategory[];
}
