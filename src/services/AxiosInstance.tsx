import axios from "axios";

export const axiosProject = axios.create({
    baseURL: "https://liftnotes-service.onrender.com/workouts"
});