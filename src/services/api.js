import axios from "axios";

const API_URL = "https://task-management-api-2.onrender.com";

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const register = (userData) => api.post("/register", userData);

export const login = (credentials) => api.post("/login", credentials);

export const logout = () => api.post("/logout");

export const getUserProfile = () => api.get("/userprofile");

export const updateUserProfile = (userData) =>
  api.put("/userprofile", userData);

export const getUser = (id) => api.get(`/users/${id}`);

export const getUsers = () => api.get("/users");

export const createTask = (taskData) => api.post("/tasks", taskData);

export const getTask = (id) => api.get(`/task/${id}`);

export const updateTask = (id, taskData) => api.put(`/task/${id}`, taskData);

export const deleteTask = (id) => api.delete(`/task/${id}`);

// New function to handle subtasks
export const updateSubtasks = (taskId, subtasks) =>
  api.put(`/task/${taskId}/subtasks`, { subtasks });

export default api;
