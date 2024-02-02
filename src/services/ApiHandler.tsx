import { AxiosResponse } from "axios";
import { UserRegistration } from "../models/UserRegistration";
import { UserSignIn } from "../models/UserSignIn";
import { Exercise, WorkoutExercise } from "../models/WorkoutModel";
import { axiosProject } from "./AxiosInstance";


export function signUp(signUp: UserRegistration) {

  return axiosProject.post("/auth/register", signUp, {
    headers: {
      "Content-Type": "application/json",
    }
  });
};

export function Login(login: UserSignIn) {
  return axiosProject.post("/auth/login", login, {
    headers: {
      "Content-Type": "application/json",
    }
  });
}

export function addExercise(exercise: Exercise) {
  return axiosProject.post("/exercise/add", exercise, {
    headers: {
      "Content-Type": "application/json",
    }
  });
}

export function getExerciseList(token: string) : Promise<AxiosResponse<Exercise[] | string>> {
  return axiosProject.get<Exercise[] | string>("/exercise/all", {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
}

export function addWorkoutExercise(workoutID: number, exerciseID: number, workoutExercise: WorkoutExercise) {
  return axiosProject.post(`/workoutExercise/add?workoutID=${workoutID}&exerciseID=${exerciseID}`, workoutExercise, {
    headers: {
      "Content-Type": "application/json",
    }
  })
}



// export function getWorkoutList() {
//   return axiosProject.get("");
// }

// export function editWorkout(id: string, workout: Exercise) {
//   return axiosProject.patch(`/${id}`, workout, {
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });
// }

// export function removeWokout(id: string) {
//   return axiosProject.delete(`/${id}`);
// }

// export function addWorkout(workout: Exercise) {
//   return axiosProject.post("/add", workout, {
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });
// }
