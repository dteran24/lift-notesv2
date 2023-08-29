import { Exercise } from "../models/WorkoutModel";
import { axiosProject } from "./AxiosInstance";

export function getWorkoutList() {
  return axiosProject.get("");
}

export function editWorkout(id: string, workout: Exercise) {
  return axiosProject.patch(`/${id}`, workout, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export function removeWokout(id: string) {
  return axiosProject.delete(`/${id}`);
}

export function addWorkout(workout: Exercise) {
  return axiosProject.post("/add", workout, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
