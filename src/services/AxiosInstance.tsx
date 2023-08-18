import axios from "axios";

export const axiosProject = axios.create({
    baseURL: "http://localhost:8080/workouts"
});