// // import { createContext, useState, useContext, useEffect } from "react";

// // const AppContext = createContext();

// // export const AppProvider = ({ children }) => {
// //   const [darkMode, setDarkMode] = useState(
// //     () => localStorage.getItem("darkMode") === "true"
// //   );
// //   const [activeMenu, setActiveMenu] = useState("dashboard");
// //   const [tasks, setTasks] = useState(() => {
// //     const savedTasks = localStorage.getItem("tasks");
// //     return savedTasks ? JSON.parse(savedTasks) : [];
// //   });
// //   const [user, setUser] = useState(() => {
// //     const savedUser = localStorage.getItem("user");
// //     return savedUser ? JSON.parse(savedUser) : null;
// //   });
// //   const [teamMembers] = useState([
// //     { id: 1, name: "Alice Johnson", email: "alice@example.com" },
// //     { id: 2, name: "Bob Smith", email: "bob@example.com" },
// //     { id: 3, name: "Charlie Brown", email: "charlie@example.com" },
// //   ]);

// //   const toggleDarkMode = () => {
// //     setDarkMode(!darkMode);
// //     localStorage.setItem("darkMode", (!darkMode).toString());
// //   };

// //   useEffect(() => {
// //     localStorage.setItem("tasks", JSON.stringify(tasks));
// //   }, [tasks]);

// //   useEffect(() => {
// //     localStorage.setItem("user", JSON.stringify(user));
// //   }, [user]);

// //   const addTask = (task) => {
// //     const newTask = { ...task, id: Date.now() };
// //     setTasks([...tasks, newTask]);
// //   };

// //   const updateTask = (updatedTask) => {
// //     setTasks(
// //       tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
// //     );
// //   };

// //   const deleteTask = (taskId) => {
// //     setTasks(tasks.filter((task) => task.id !== taskId));
// //   };

// //   const assignTask = (taskId, userId) => {
// //     setTasks(
// //       tasks.map((task) =>
// //         task.id === taskId ? { ...task, assignedTo: userId } : task
// //       )
// //     );
// //   };

// //   const startTimeTracking = (taskId) => {
// //     setTasks(
// //       tasks.map((task) =>
// //         task.id === taskId
// //           ? {
// //               ...task,
// //               timeTracking: {
// //                 ...task.timeTracking,
// //                 start: new Date().toISOString(),
// //               },
// //             }
// //           : task
// //       )
// //     );
// //   };

// //   const stopTimeTracking = (taskId) => {
// //     setTasks(
// //       tasks.map((task) => {
// //         if (
// //           task.id === taskId &&
// //           task.timeTracking &&
// //           task.timeTracking.start
// //         ) {
// //           const start = new Date(task.timeTracking.start);
// //           const end = new Date();
// //           const duration = end.getTime() - start.getTime();
// //           return {
// //             ...task,
// //             timeTracking: {
// //               ...task.timeTracking,
// //               end: end.toISOString(),
// //               duration: (task.timeTracking.duration || 0) + duration,
// //             },
// //           };
// //         }
// //         return task;
// //       })
// //     );
// //   };

// //   const exportData = () => {
// //     const data = JSON.stringify({ tasks, user });
// //     const blob = new Blob([data], { type: "application/json" });
// //     const url = URL.createObjectURL(blob);
// //     const a = document.createElement("a");
// //     a.href = url;
// //     a.download = "task_manager_data.json";
// //     a.click();
// //   };

// //   const importData = (data) => {
// //     const { tasks: importedTasks, user: importedUser } = JSON.parse(data);
// //     setTasks(importedTasks);
// //     setUser(importedUser);
// //   };

// //   return (
// //     <AppContext.Provider
// //       value={{
// //         darkMode,
// //         toggleDarkMode,
// //         activeMenu,
// //         setActiveMenu,
// //         tasks,
// //         addTask,
// //         updateTask,
// //         deleteTask,
// //         assignTask,
// //         startTimeTracking,
// //         stopTimeTracking,
// //         user,
// //         setUser,
// //         teamMembers,
// //         exportData,
// //         importData,
// //       }}
// //     >
// //       {children}
// //     </AppContext.Provider>
// //   );
// // };

// // export const useAppContext = () => {
// //   const context = useContext(AppContext);
// //   if (context === undefined) {
// //     throw new Error("useAppContext must be used within an AppProvider");
// //   }
// //   return context;
// // };

// import { createContext, useState, useContext, useEffect } from "react";

// const AppContext = createContext();

// export const AppProvider = ({ children }) => {
//   const [darkMode, setDarkMode] = useState(
//     () => localStorage.getItem("darkMode") === "true"
//   );
//   const [activeMenu, setActiveMenu] = useState("dashboard");
//   const [tasks, setTasks] = useState(() => {
//     const savedTasks = localStorage.getItem("tasks");
//     return savedTasks ? JSON.parse(savedTasks) : [];
//   });
//   const [user, setUser] = useState(() => {
//     const savedUser = localStorage.getItem("user");
//     return savedUser ? JSON.parse(savedUser) : null;
//   });
//   const [teamMembers] = useState([
//     { id: 1, name: "Alice Johnson", email: "alice@example.com" },
//     { id: 2, name: "Bob Smith", email: "bob@example.com" },
//     { id: 3, name: "Charlie Brown", email: "charlie@example.com" },
//   ]);
//   const [categories, setCategories] = useState(() => {
//     const savedCategories = localStorage.getItem("categories");
//     return savedCategories
//       ? JSON.parse(savedCategories)
//       : ["Work", "Personal", "Study"];
//   });
//   const [analyticsTimeRange, setAnalyticsTimeRange] = useState("week");

//   const toggleDarkMode = () => {
//     setDarkMode(!darkMode);
//     localStorage.setItem("darkMode", (!darkMode).toString());
//   };

//   useEffect(() => {
//     localStorage.setItem("tasks", JSON.stringify(tasks));
//   }, [tasks]);

//   useEffect(() => {
//     localStorage.setItem("user", JSON.stringify(user));
//   }, [user]);

//   useEffect(() => {
//     localStorage.setItem("categories", JSON.stringify(categories));
//   }, [categories]);

//   const addTask = (task) => {
//     const newTask = {
//       ...task,
//       id: Date.now(),
//       createdAt: new Date().toISOString(),
//       status: task.status || "pending",
//       priority: task.priority || "medium",
//       timeTracking: { duration: 0 },
//     };
//     setTasks([...tasks, newTask]);
//   };

//   const updateTask = (updatedTask) => {
//     setTasks(
//       tasks.map((task) => {
//         if (task.id === updatedTask.id) {
//           return {
//             ...updatedTask,
//             updatedAt: new Date().toISOString(),
//             completedDate:
//               updatedTask.status === "completed"
//                 ? new Date().toISOString()
//                 : task.completedDate,
//           };
//         }
//         return task;
//       })
//     );
//   };

//   const deleteTask = (taskId) => {
//     setTasks(tasks.filter((task) => task.id !== taskId));
//   };

//   const assignTask = (taskId, userId) => {
//     setTasks(
//       tasks.map((task) =>
//         task.id === taskId ? { ...task, assignedTo: userId } : task
//       )
//     );
//   };

//   const startTimeTracking = (taskId) => {
//     setTasks(
//       tasks.map((task) =>
//         task.id === taskId
//           ? {
//               ...task,
//               timeTracking: {
//                 ...task.timeTracking,
//                 start: new Date().toISOString(),
//               },
//             }
//           : task
//       )
//     );
//   };

//   const stopTimeTracking = (taskId) => {
//     setTasks(
//       tasks.map((task) => {
//         if (
//           task.id === taskId &&
//           task.timeTracking &&
//           task.timeTracking.start
//         ) {
//           const start = new Date(task.timeTracking.start);
//           const end = new Date();
//           const duration = end.getTime() - start.getTime();
//           return {
//             ...task,
//             timeTracking: {
//               ...task.timeTracking,
//               end: end.toISOString(),
//               duration: (task.timeTracking.duration || 0) + duration,
//             },
//           };
//         }
//         return task;
//       })
//     );
//   };

//   const exportData = () => {
//     const data = JSON.stringify({ tasks, user, categories });
//     const blob = new Blob([data], { type: "application/json" });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = "task_manager_data.json";
//     a.click();
//   };

//   const importData = (data) => {
//     const {
//       tasks: importedTasks,
//       user: importedUser,
//       categories: importedCategories,
//     } = JSON.parse(data);
//     setTasks(importedTasks);
//     setUser(importedUser);
//     setCategories(importedCategories);
//   };

//   const addCategory = (category) => {
//     setCategories([...categories, category]);
//   };

//   const deleteCategory = (category) => {
//     setCategories(categories.filter((c) => c !== category));
//   };

//   const getProductivityScore = () => {
//     const completedTasks = tasks.filter(
//       (task) => task.status === "completed"
//     ).length;
//     return tasks.length > 0
//       ? Math.round((completedTasks / tasks.length) * 100)
//       : 0;
//   };

//   const getTasksByCategory = () => {
//     return categories.map((category) => ({
//       category,
//       count: tasks.filter((task) => task.category === category).length,
//     }));
//   };

//   const getAverageTimeToComplete = () => {
//     const completedTasks = tasks.filter(
//       (task) =>
//         task.status === "completed" && task.completedDate && task.createdAt
//     );
//     if (completedTasks.length === 0) return 0;

//     const totalTime = completedTasks.reduce((sum, task) => {
//       const createdDate = new Date(task.createdAt);
//       const completedDate = new Date(task.completedDate);
//       return sum + (completedDate - createdDate);
//     }, 0);

//     return Math.round(
//       totalTime / completedTasks.length / (1000 * 60 * 60 * 24)
//     ); // in days
//   };

//   return (
//     <AppContext.Provider
//       value={{
//         darkMode,
//         toggleDarkMode,
//         activeMenu,
//         setActiveMenu,
//         tasks,
//         addTask,
//         updateTask,
//         deleteTask,
//         assignTask,
//         startTimeTracking,
//         stopTimeTracking,
//         user,
//         setUser,
//         teamMembers,
//         exportData,
//         importData,
//         categories,
//         addCategory,
//         deleteCategory,
//         analyticsTimeRange,
//         setAnalyticsTimeRange,
//         getProductivityScore,
//         getTasksByCategory,
//         getAverageTimeToComplete,
//       }}
//     >
//       {children}
//     </AppContext.Provider>
//   );
// };

// export const useAppContext = () => {
//   const context = useContext(AppContext);
//   if (context === undefined) {
//     throw new Error("useAppContext must be used within an AppProvider");
//   }
//   return context;
// };



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

  const addTask = (task) => {
    const newTask = {
      ...task,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      status: task.status || "pending",
      priority: task.priority || "medium",
      timeTracking: { duration: 0 },
    };
    setTasks([...tasks, newTask]);
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
      user: importedUser,
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
    setUser(importedUser);
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
        user,
        setUser,
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