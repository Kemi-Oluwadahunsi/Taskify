import { createContext, useState, useContext, useEffect } from "react";
import {
  getTask,
  createTask,
  updateTask,
  deleteTask,
  updateSubtasks,
} from "../services/api";

const TaskContext = createContext();

export const useTask = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const fetchedTasks = await getTask();
      setTasks(fetchedTasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const addTask = async (taskData) => {
    try {
      const newTask = await createTask(taskData);
      setTasks((prevTasks) => [...prevTasks, newTask]);
      return newTask;
    } catch (error) {
      console.error("Error adding task:", error);
      throw error;
    }
  };

  const updateTaskContext = async (updatedTask) => {
    try {
      const result = await updateTask(updatedTask.id, updatedTask);
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === updatedTask.id ? { ...task, ...result } : task
        )
      );
      return result;
    } catch (error) {
      console.error("Error updating task:", error);
      throw error;
    }
  };

  const deleteTaskContext = async (taskId) => {
    try {
      await deleteTask(taskId);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
      throw error;
    }
  };

  const updateSubtasksContext = async (taskId, subtasks) => {
    try {
      const result = await updateSubtasks(taskId, subtasks);
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, subtasks: result } : task
        )
      );
      return result;
    } catch (error) {
      console.error("Error updating subtasks:", error);
      throw error;
    }
  };

  const value = {
    tasks,
    addTask,
    updateTask: updateTaskContext,
    deleteTask: deleteTaskContext,
    updateSubtasks: updateSubtasksContext,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};
