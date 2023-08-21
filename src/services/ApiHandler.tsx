import { Exercise } from "../models/WorkoutModel";
import { axiosProject } from "./AxiosInstance";



export function getWorkoutList() {
    return axiosProject.get('');
}

export function editWorkout(id: string, workout: Exercise) {
    return axiosProject.patch(`/${id}`, workout, {
        headers: {
            "Content-Type": "application/json",
        },
    });
}
// export function submitForm(formData: FormData) {
//     return axiosProject.post('', formData, {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });
// }