import axios from "axios";

export const axiosProject = axios.create({
  baseURL: "http://liftnotes-service.up.railway.app",
});
