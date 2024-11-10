// // // import { useState } from "react";
// // // import { useAuth } from "../contexts/AuthContext";
// // // import { useTheme } from "../contexts/ThemeContext";
// // // import AddTask from "./AddTask";
// // // import TaskList from "./TaskList";
// // // import CalendarView from "./CalendarView";
// // // import { Link } from "react-router-dom";
// // // import { motion } from "framer-motion";

// // // export default function Dashboard() {
// // //   const { user, logout } = useAuth();
// // //   const { darkMode, toggleDarkMode } = useTheme();
// // //   const [view, setView] = useState("list");

// // //   return (
// // //     <div
// // //       className={`min-h-screen ${
// // //         darkMode ? "dark" : ""
// // //       } bg-gradient-to-br from-background-light to-accent dark:from-background-dark dark:to-primary transition-bg duration-500`}
// // //     >
// // //       <nav className="bg-white bg-opacity-90 dark:bg-gray-800 dark:bg-opacity-90 backdrop-filter backdrop-blur-lg shadow-md">
// // //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// // //           <div className="flex justify-between items-center h-16">
// // //             <motion.div
// // //               initial={{ opacity: 0, x: -20 }}
// // //               animate={{ opacity: 1, x: 0 }}
// // //               transition={{ duration: 0.5 }}
// // //               className="flex items-center"
// // //             >
// // //               <h1 className="text-2xl font-bold text-primary dark:text-accent text-shadow">
// // //                 Task Master
// // //               </h1>
// // //             </motion.div>
// // //             <div className="flex items-center space-x-4">
// // //               <motion.button
// // //                 whileHover={{ scale: 1.1 }}
// // //                 whileTap={{ scale: 0.9 }}
// // //                 onClick={toggleDarkMode}
// // //                 className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white transition-colors duration-200"
// // //               >
// // //                 {darkMode ? "🌞" : "🌙"}
// // //               </motion.button>
// // //               <Link
// // //                 to="/profile"
// // //                 className="text-primary hover:text-secondary dark:text-accent dark:hover:text-white transition-colors duration-200"
// // //               >
// // //                 Profile
// // //               </Link>
// // //               <span className="text-gray-700 dark:text-gray-300">
// // //                 Welcome, {user?.username}
// // //               </span>
// // //               <motion.button
// // //                 whileHover={{ scale: 1.05 }}
// // //                 whileTap={{ scale: 0.95 }}
// // //                 onClick={logout}
// // //                 className="bg-primary hover:bg-secondary text-white font-bold py-2 px-4 rounded-full shadow-md transition-colors duration-200 dark:bg-accent dark:hover:bg-secondary"
// // //               >
// // //                 Logout
// // //               </motion.button>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </nav>

// // //       <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
// // //         <div className="px-4 py-6 sm:px-0">
// // //           <motion.div
// // //             initial={{ opacity: 0, y: 20 }}
// // //             animate={{ opacity: 1, y: 0 }}
// // //             transition={{ duration: 0.5 }}
// // //             className="mb-8 flex justify-center space-x-4"
// // //           >
// // //             <motion.button
// // //               whileHover={{ scale: 1.05 }}
// // //               whileTap={{ scale: 0.95 }}
// // //               onClick={() => setView("list")}
// // //               className={`px-6 py-3 rounded-full shadow-md transition-colors duration-200 ${
// // //                 view === "list"
// // //                   ? "bg-primary text-white dark:bg-accent"
// // //                   : "bg-white text-primary dark:bg-gray-800 dark:text-accent"
// // //               }`}
// // //             >
// // //               List View
// // //             </motion.button>
// // //             <motion.button
// // //               whileHover={{ scale: 1.05 }}
// // //               whileTap={{ scale: 0.95 }}
// // //               onClick={() => setView("calendar")}
// // //               className={`px-6 py-3 rounded-full shadow-md transition-colors duration-200 ${
// // //                 view === "calendar"
// // //                   ? "bg-primary text-white dark:bg-accent"
// // //                   : "bg-white text-primary dark:bg-gray-800 dark:text-accent"
// // //               }`}
// // //             >
// // //               Calendar View
// // //             </motion.button>
// // //           </motion.div>
// // //           <motion.div
// // //             initial={{ opacity: 0 }}
// // //             animate={{ opacity: 1 }}
// // //             transition={{ duration: 0.5 }}
// // //           >
// // //             <AddTask />
// // //             {view === "list" ? <TaskList /> : <CalendarView />}
// // //           </motion.div>
// // //         </div>
// // //       </main>
// // //     </div>
// // //   );
// // // }

// // import { useAppContext } from "../contexts/AppContext";
// // import Sidebar from "./Sidebar";
// // import DashboardContent from "./DashboardContent";
// // import TaskChart from "./TaskChart";
// // import PriorityChart from "./PriorityChart";
// // import TaskProgressChart from "./TaskProgressChart";
// // import { Sun, Moon } from "lucide-react";

// // export default function Dashboard() {
// //   const { darkMode, toggleDarkMode } = useAppContext();

// //   return (
// //     <div
// //       className={`min-h-screen flex ${
// //         darkMode ? "dark bg-background-dark text-white" : "bg-background-light"
// //       }`}
// //     >
// //       <Sidebar />
// //       <div className="flex-1 flex flex-col overflow-hidden">
// //         <header className="bg-primary text-white shadow-lg p-4 flex justify-between items-center">
// //           <h1 className="text-2xl font-bold">Task Management Dashboard</h1>
// //           <button
// //             onClick={toggleDarkMode}
// //             className="p-2 rounded-full hover:bg-secondary transition-bg"
// //           >
// //             {darkMode ? <Sun size={24} /> : <Moon size={24} />}
// //           </button>
// //         </header>
// //         <main className="flex-1 overflow-x-hidden overflow-y-auto bg-lightest dark:bg-gray-900 p-6">
// //           <DashboardContent />
// //           <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
// //             <div>
// //               <h2 className="text-2xl font-bold mb-4">Task Completion Chart</h2>
// //               <TaskChart />
// //             </div>
// //             <div>
// //               <h2 className="text-2xl font-bold mb-4">
// //                 Task Priority Distribution
// //               </h2>
// //               <PriorityChart />
// //             </div>
// //           </div>
// //           <div className="mt-8">
// //             <h2 className="text-2xl font-bold mb-4">Task Progress Overview</h2>
// //             <TaskProgressChart />
// //           </div>
// //         </main>
// //       </div>
// //     </div>
// //   );
// // }

// import { useState } from "react";
// import { Routes, Route } from "react-router-dom";
// import { useAppContext } from "../contexts/AppContext";
// import Sidebar from "./Sidebar";
// import DashboardContent from "./DashboardContent";
// import TaskList from "./TaskList";
// import Calendar from "./CalendarView";
// import Analytics from "./Analytics";
// import PomodoroTimer from "./PomodoroTimer";
// import Settings from "./Settings";
// import { Sun, Moon, Menu } from "lucide-react";
// import UserProfile from "./authenetication/userProfile/UserProfile";

// export default function Dashboard() {
//   const { darkMode, toggleDarkMode } = useAppContext();
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   const toggleSidebar = () => {
//     setSidebarOpen(!sidebarOpen);
//   };

//   return (
//     <div
//       className={`min-h-screen flex flex-col md:flex-row ${
//         darkMode ? "dark bg-background-dark text-white" : "bg-background-light"
//       }`}
//     >
//       <div className="fixed top-0 left-0">
//         <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
//       </div>

//       <div className="flex-1 flex flex-col overflow-hidden">
//         <header className="bg-primary text-white shadow-lg p-4 flex justify-between items-center">
//           <div className="flex items-center">
//             <button
//               onClick={toggleSidebar}
//               className="mr-4 md:hidden text-white focus:outline-none"
//             >
//               <Menu size={24} />
//             </button>
//             <h1 className="text-xl md:text-2xl font-bold">
//               Task Management Dashboard
//             </h1>
//           </div>
//           <button
//             onClick={toggleDarkMode}
//             className="p-2 rounded-full hover:bg-secondary transition-bg"
//           >
//             {darkMode ? <Sun size={24} /> : <Moon size={24} />}
//           </button>
//         </header>
//         <main className="flex-1 overflow-x-hidden overflow-y-auto bg-lightest dark:bg-[#1F1F1F] py-4 md:py-6">
//           <div className="w-[80%] bg-lighter mx-auto p-4 rounded-xl">
//             <Routes>
//               <Route path="/" element={<DashboardContent />} />

//               <Route path="/tasks" element={<TaskList />} />
//               <Route path="/calendar" element={<Calendar />} />
//               <Route path="/analytics" element={<Analytics />} />
//               <Route path="/pomodoro" element={<PomodoroTimer />} />
//               <Route path="/settings" element={<Settings />} />
//               <Route path="/profile" element={<UserProfile />} />
//             </Routes>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }

// import { useState } from "react";
// import { Routes, Route } from "react-router-dom";
// import { useAppContext } from "../contexts/AppContext";
// import Sidebar from "./Sidebar";
// import DashboardContent from "./DashboardContent";
// import TaskList from "./TaskList";
// import Calendar from "./CalendarView";
// import Analytics from "./Analytics";
// import PomodoroTimer from "./PomodoroTimer";
// import Settings from "./Settings";
// import { Sun, Moon, Menu } from "lucide-react";
// import UserProfile from "./authenetication/userProfile/UserProfile";

// export default function Dashboard() {
//   const { darkMode, toggleDarkMode } = useAppContext();
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   const toggleSidebar = () => {
//     setSidebarOpen(!sidebarOpen);
//   };

//   return (
//     <div
//       className={`min-h-screen flex ${
//         darkMode ? "dark bg-background-dark text-white" : "bg-background-light"
//       }`}
//     >
//       <div className="lg:fixed top-0 left-0 h-full">
//         <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
//       </div>
//       <div className="flex-1 flex flex-col md:ml-64 transition-all duration-300">
//         <header className="bg-primary text-white shadow-lg p-4 flex justify-between items-center">
//           <div className="flex items-center">
//             <button
//               onClick={toggleSidebar}
//               className="mr-4 md:hidden text-white focus:outline-none"
//             >
//               <Menu size={24} />
//             </button>
//             <h1 className="text-xl md:text-2xl font-bold">
//               Task Management Dashboard
//             </h1>
//           </div>
//           <button
//             onClick={toggleDarkMode}
//             className="p-2 rounded-full hover:bg-secondary transition-bg"
//           >
//             {darkMode ? <Sun size={24} /> : <Moon size={24} />}
//           </button>
//         </header>
//         <main className="flex-1 overflow-x-hidden overflow-y-auto bg-lightest dark:bg-[#1F1F1F] py-4 md:py-6">
//           <div className="w-[90%] max-w-5xl bg-lighter mx-auto p-4 rounded-xl">
//             <Routes>
//               <Route path="/" element={<DashboardContent />} />
//               <Route path="/tasks" element={<TaskList />} />
//               <Route path="/calendar" element={<Calendar />} />
//               <Route path="/analytics" element={<Analytics />} />
//               <Route path="/pomodoro" element={<PomodoroTimer />} />
//               <Route path="/settings" element={<Settings />} />
//               <Route path="/profile" element={<UserProfile />} />
//             </Routes>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }


import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import Sidebar from "./Sidebar";
import DashboardContent from "./DashboardContent";
import TaskList from "./TaskList";
import Calendar from "./CalendarView";
import Analytics from "./Analytics";
import PomodoroTimer from "./PomodoroTimer";
import Settings from "./Settings";
import { Sun, Moon, Menu} from "lucide-react";
import UserProfile from "./authenetication/userProfile/UserProfile";

export default function Dashboard() {
  const { darkMode, toggleDarkMode } = useAppContext();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
      setSidebarOpen(window.innerWidth >= 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div
      className={`min-h-screen flex ${
        darkMode ? "dark bg-background-dark text-white" : "bg-background-light"
      }`}
    >
      <Sidebar
        isOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
        isMobile={isMobile}
      />
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          sidebarOpen && !isMobile ? "md:ml-64" : "md:ml-[5%]"
        }`}
      >
        <header className="bg-primary text-white shadow-lg p-4 flex justify-between items-center">
          <div className="flex items-center">
            <button
              onClick={toggleSidebar}
              className="text-white focus:outline-none p-1 rounded-full hover:bg-gray-700 transition-colors duration-200 md:hidden"
            >
              {!sidebarOpen && <Menu size={24} />}
            </button>
            <h1 className="text-xl md:text-2xl font-bold">
              Task Management Dashboard
            </h1>
          </div>
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-secondary transition-bg"
          >
            {darkMode ? <Sun size={24} /> : <Moon size={24} />}
          </button>
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-lightest dark:bg-[#1F1F1F] py-4 md:py-6">
          <div className="w-[90%] max-w-6xl bg-lighter mx-auto p-4 rounded-xl min-h-full">
            <Routes>
              <Route path="/overview" element={<DashboardContent />} />
              <Route path="/tasks" element={<TaskList />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/pomodoro" element={<PomodoroTimer />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/profile" element={<UserProfile />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
}