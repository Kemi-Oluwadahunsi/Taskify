import { createContext, useState, useContext, useEffect } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("darkMode") === "true"
  );
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [teamMembers] = useState([
    { id: 1, name: "Alice Johnson", email: "alice@example.com" },
    { id: 2, name: "Bob Smith", email: "bob@example.com" },
    { id: 3, name: "Charlie Brown", email: "charlie@example.com" },
  ]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("darkMode", (!darkMode).toString());
  };

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  const addTask = (task) => {
    const newTask = { ...task, id: Date.now() };
    setTasks([...tasks, newTask]);
  };

  const updateTask = (updatedTask) => {
    setTasks(
      tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const assignTask = (taskId, userId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, assignedTo: userId } : task
      )
    );
  };

  const startTimeTracking = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              timeTracking: {
                ...task.timeTracking,
                start: new Date().toISOString(),
              },
            }
          : task
      )
    );
  };

  const stopTimeTracking = (taskId) => {
    setTasks(
      tasks.map((task) => {
        if (
          task.id === taskId &&
          task.timeTracking &&
          task.timeTracking.start
        ) {
          const start = new Date(task.timeTracking.start);
          const end = new Date();
          const duration = end.getTime() - start.getTime();
          return {
            ...task,
            timeTracking: {
              ...task.timeTracking,
              end: end.toISOString(),
              duration: (task.timeTracking.duration || 0) + duration,
            },
          };
        }
        return task;
      })
    );
  };

  const exportData = () => {
    const data = JSON.stringify({ tasks, user });
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "task_manager_data.json";
    a.click();
  };

  const importData = (data) => {
    const { tasks: importedTasks, user: importedUser } = JSON.parse(data);
    setTasks(importedTasks);
    setUser(importedUser);
  };

  return (
    <AppContext.Provider
      value={{
        darkMode,
        toggleDarkMode,
        activeMenu,
        setActiveMenu,
        tasks,
        addTask,
        updateTask,
        deleteTask,
        assignTask,
        startTimeTracking,
        stopTimeTracking,
        user,
        setUser,
        teamMembers,
        exportData,
        importData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
