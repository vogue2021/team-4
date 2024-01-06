import axios from "axios";

export default axios.create({ baseURL: "http://localhost:4100/" });

export const authAxios = axios.create({
  baseURL: "http://localhost:8080/",
  headers: { "Content-Type": "application/json" },
});
