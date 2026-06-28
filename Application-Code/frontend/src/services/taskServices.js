import axios from "axios";

const apiUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:3500/api/tasks";

const apiClient = axios.create({
  baseURL: apiUrl,
  timeout: 5000,
  headers: { "Content-Type": "application/json" },
});

export function getTasks() {
  return apiClient.get("/");
}

export function addTask(task) {
  return apiClient.post("/", task);
}

export function updateTask(id, task) {
  return apiClient.put(`/${id}`, task);
}

export function deleteTask(id) {
  return apiClient.delete(`/${id}`);
}
