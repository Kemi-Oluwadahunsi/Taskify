import axios from "axios";
import { createContext, useState, useContext, useEffect } from "react";
import { useAuth } from "./AuthContext";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const API_URL = import.meta.env.VITE_APP_API_URL;
   const { currentUser } = useAuth();
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("darkMode") === "true"
  );
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  // const [user, setUser] = useState(() => {
  //   const savedUser = localStorage.getItem("user");
  //   return savedUser ? JSON.parse(savedUser) : null;
  // });
  const user = currentUser;
  const [teamMembers] = useState([
    { id: 1, name: "Alice Johnson", email: "alice@example.com" },
    { id: 2, name: "Bob Smith", email: "bob@example.com" },
    { id: 3, name: "Charlie Brown", email: "charlie@example.com" },
  ]);
  const [categories, setCategories] = useState(() => {
    const savedCategories = localStorage.getItem("categories");
    return savedCategories
      ? JSON.parse(savedCategories)
      : ["Work", "Personal", "Study"];
  });
  const [analyticsTimeRange, setAnalyticsTimeRange] = useState("week");

  // New settings state
  const [accentColor, setAccentColor] = useState(
    () => localStorage.getItem("accentColor") || "purple"
  );
  const [notificationSettings, setNotificationSettings] = useState(() => {
    const savedSettings = localStorage.getItem("notificationSettings");
    return savedSettings
      ? JSON.parse(savedSettings)
      : {
          email: true,
          push: true,
          desktop: true,
        };
  });
  const [timeFormat, setTimeFormat] = useState(
    () => localStorage.getItem("timeFormat") || "24"
  );
  const [language, setLanguage] = useState(
    () => localStorage.getItem("language") || "en"
  );
  const [soundEnabled, setSoundEnabled] = useState(
    () => localStorage.getItem("soundEnabled") === "true"
  );
  const [privacyMode, setPrivacyMode] = useState(
    () => localStorage.getItem("privacyMode") === "true"
  );
  const [calendarStartDay, setCalendarStartDay] = useState(
    () => localStorage.getItem("calendarStartDay") || "sunday"
  );
  const [taskViewMode, setTaskViewMode] = useState(
    () => localStorage.getItem("taskViewMode") || "list"
  );
  const [pomodoroSettings, setPomodoroSettings] = useState(() => {
    const savedSettings = localStorage.getItem("pomodoroSettings");
    return savedSettings
      ? JSON.parse(savedSettings)
      : {
          workDuration: 25,
          shortBreakDuration: 5,
          longBreakDuration: 15,
          longBreakInterval: 4,
        };
  });

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

  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(categories));
  }, [categories]);

  // New useEffects for settings
  useEffect(() => {
    localStorage.setItem("accentColor", accentColor);
  }, [accentColor]);

  useEffect(() => {
    localStorage.setItem(
      "notificationSettings",
      JSON.stringify(notificationSettings)
    );
  }, [notificationSettings]);

  useEffect(() => {
    localStorage.setItem("timeFormat", timeFormat);
  }, [timeFormat]);

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem("soundEnabled", soundEnabled.toString());
  }, [soundEnabled]);

  useEffect(() => {
    localStorage.setItem("privacyMode", privacyMode.toString());
  }, [privacyMode]);

  useEffect(() => {
    localStorage.setItem("calendarStartDay", calendarStartDay);
  }, [calendarStartDay]);

  useEffect(() => {
    localStorage.setItem("taskViewMode", taskViewMode);
  }, [taskViewMode]);

  useEffect(() => {
    localStorage.setItem("pomodoroSettings", JSON.stringify(pomodoroSettings));
  }, [pomodoroSettings]);

    const addTask = async (task) => {
      try {
        if (!currentUser || !currentUser?.id) {
          throw new Error("User is not authenticated");
        }
        const response = await axios.post(`${API_URL}/users/${currentUser?.id}/tasks`, {
          title: task.title,
          description: task.description,
          dueDate: task.dueDate,
          completed: false,
          priority: task.priority || "medium",
          status: task.status || "pending",
          subtasks: task.subtasks || [],
          estimatedTime: task.estimatedTime || { hours: 0, minutes: 0 },
          tags: task.tags || [],
        });

        if (response.status === 201) {
          const newTask = response.data;
          setTasks([...tasks, newTask]);
          return { success: true, message: "Task created successfully" };
        } else {
          throw new Error("Unexpected response status");
        }
      } catch (error) {
        console.error("Error adding task:", error);
        let errorMessage =
          "An unexpected error occurred while creating the task.";

        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          if (error.response.status === 400) {
            errorMessage =
              error.response.data.message || "Invalid task data provided.";
          } else if (error.response.status === 401) {
            errorMessage =
              "You are not authorized to create tasks. Please log in again.";
          } else if (error.response.status === 500) {
            errorMessage = "Server error. Please try again later.";
          }
        } else if (error.request) {
          // The request was made but no response was received
          errorMessage =
            "Unable to reach the server. Please check your internet connection.";
        } else {
          // Something happened in setting up the request that triggered an Error
          errorMessage = error.message;
        }

        return { success: false, message: errorMessage };
      }
    };

  const updateTask = (updatedTask) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === updatedTask.id) {
          return {
            ...updatedTask,
            updatedAt: new Date().toISOString(),
            completedDate:
              updatedTask.status === "completed"
                ? new Date().toISOString()
                : task.completedDate,
          };
        }
        return task;
      })
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
    const data = JSON.stringify({
      tasks,
      user,
      categories,
      accentColor,
      notificationSettings,
      timeFormat,
      language,
      soundEnabled,
      privacyMode,
      calendarStartDay,
      taskViewMode,
      pomodoroSettings,
    });
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "task_manager_data.json";
    a.click();
  };

  const importData = (data) => {
    const {
      tasks: importedTasks,
      categories: importedCategories,
      accentColor: importedAccentColor,
      notificationSettings: importedNotificationSettings,
      timeFormat: importedTimeFormat,
      language: importedLanguage,
      soundEnabled: importedSoundEnabled,
      privacyMode: importedPrivacyMode,
      calendarStartDay: importedCalendarStartDay,
      taskViewMode: importedTaskViewMode,
      pomodoroSettings: importedPomodoroSettings,
    } = JSON.parse(data);
    setTasks(importedTasks);
    setCategories(importedCategories);
    setAccentColor(importedAccentColor);
    setNotificationSettings(importedNotificationSettings);
    setTimeFormat(importedTimeFormat);
    setLanguage(importedLanguage);
    setSoundEnabled(importedSoundEnabled);
    setPrivacyMode(importedPrivacyMode);
    setCalendarStartDay(importedCalendarStartDay);
    setTaskViewMode(importedTaskViewMode);
    setPomodoroSettings(importedPomodoroSettings);
  };

  const addCategory = (category) => {
    setCategories([...categories, category]);
  };

  const deleteCategory = (category) => {
    setCategories(categories.filter((c) => c !== category));
  };

  const getProductivityScore = () => {
    const completedTasks = tasks.filter(
      (task) => task.status === "completed"
    ).length;
    return tasks.length > 0
      ? Math.round((completedTasks / tasks.length) * 100)
      : 0;
  };

  const getTasksByCategory = () => {
    return categories.map((category) => ({
      category,
      count: tasks.filter((task) => task.category === category).length,
    }));
  };

  const getAverageTimeToComplete = () => {
    const completedTasks = tasks.filter(
      (task) =>
        task.status === "completed" && task.completedDate && task.createdAt
    );
    if (completedTasks.length === 0) return 0;

    const totalTime = completedTasks.reduce((sum, task) => {
      const createdDate = new Date(task.createdAt);
      const completedDate = new Date(task.completedDate);
      return sum + (completedDate - createdDate);
    }, 0);

    return Math.round(
      totalTime / completedTasks.length / (1000 * 60 * 60 * 24)
    ); // in days
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
        teamMembers,
        exportData,
        importData,
        categories,
        addCategory,
        deleteCategory,
        analyticsTimeRange,
        setAnalyticsTimeRange,
        getProductivityScore,
        getTasksByCategory,
        getAverageTimeToComplete,
        accentColor,
        setAccentColor,
        notificationSettings,
        setNotificationSettings,
        timeFormat,
        setTimeFormat,
        language,
        setLanguage,
        soundEnabled,
        setSoundEnabled,
        privacyMode,
        setPrivacyMode,
        calendarStartDay,
        setCalendarStartDay,
        taskViewMode,
        setTaskViewMode,
        pomodoroSettings,
        setPomodoroSettings,
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