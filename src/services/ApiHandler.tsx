import { AxiosResponse } from "axios";
import { UserRegistration } from "../models/UserRegistration";
import { UserSignIn } from "../models/UserSignIn";
import { Exercise, WorkoutExercise } from "../models/WorkoutModel";
import { axiosProject } from "./AxiosInstance";

export function signUp(signUp: UserRegistration) {
  return axiosProject.post("/auth/register", signUp, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export function Login(login: UserSignIn) {
  return axiosProject.post("/auth/login", login, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export function addExercise(exercise: Exercise, token: string) {
  return axiosProject.post("/exercise/add", exercise, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
}

export function getExerciseList(
  token: string
): Promise<AxiosResponse<Exercise[] | string>> {
  return axiosProject.get<Exercise[] | string>("/exercise/all", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function addWorkoutExercise(
  workoutExerciseID: number,
  workoutExercise: WorkoutExercise,
  token: string
) {
  return axiosProject.post(
    `/workoutExercise/add/${workoutExerciseID}`,
    workoutExercise,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
}

export function removeWorkoutExercise(
  workoutExerciseID: number,
  token: string
) {
  return axiosProject.delete(`/workoutExercise/delete/${workoutExerciseID}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
}

export function getWorkoutExerciseList(token: string) {
  return axiosProject.get("/workoutExercise/all", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function updateWorkoutExercise(
  token: string,
  workoutExerciseID: number,
  workoutExercise: WorkoutExercise
) {
  return axiosProject.patch(
    `/workoutExercise/update/${workoutExerciseID}`,
    workoutExercise,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
}

export function getWorkoutExerciseById(
  token: string,
  workoutExerciseID: number
) {
  return axiosProject.get(`/workoutExercise/${workoutExerciseID}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function getHistoryByUserId(
  token: string
) {
  return axiosProject.get('/history/all', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
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
