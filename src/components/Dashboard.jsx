import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import Sidebar from "./Sidebar";
import DashboardContent from "./DashboardContent";
import TaskList from "./TaskList";
import Calendar from "./CalendarView";
import PomodoroTimer from "./PomodoroTimer";
import Settings from "./Settings";
import { Sun, Moon, Menu } from "lucide-react";
import UserProfile from "./authenetication/userProfile/UserProfile";
import { useAuth } from "../contexts/AuthContext";
import { useCurrentDateTime } from "../hooks/useCurrentDateTime";
import AddTask from "./AddTask";
import SideRight from "./sidebarRight/SideRight";
import AnalyticsPage from "./AnalyticsPage";

export default function Dashboard() {
  const { currentUser } = useAuth();
  const dateTime = useCurrentDateTime();
  const formattedDate = dateTime.formattedDate;
  const formattedTime = dateTime.formattedTime;
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
        darkMode ? "dark bg-gray-900 text-white" : "bg-gray-100"
      }`}
    >
      <Sidebar
        isOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
        isMobile={isMobile}
      />
      <div className="flex-1 flex flex-col">
        <header className="sticky top-0 left-0 z-10 max-w-[67.1rem] bg-white w-full mx-auto dark:bg-gray-800 shadow-lg">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center">
                <button
                  onClick={toggleSidebar}
                  className="text-gray-500 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-purple-500 p-2 rounded-md lg:hidden"
                >
                  <Menu size={24} />
                </button>
                <h1 className="ml-2 text-xl font-bold text-gray-900 dark:text-white md:hidden">
                  Taskify
                </h1>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <img
                    src={currentUser?.profileImage || "/images/authbg.webp"}
                    alt="User"
                    className="w-8 h-8 rounded-full object-cover border-2 border-purple-500"
                  />
                  <div className="hidden md:flex flex-col">
                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Kemi Dahunsi
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {formattedDate} {formattedTime}
                    </p>
                  </div>
                </div>
                <button
                  onClick={toggleDarkMode}
                  className="p-2 rounded-full text-gray-500 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-purple-500"
                  aria-label="Toggle dark mode"
                >
                  {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#ebd5ff] dark:bg-[#1F1F1F]">
          <div className="max-w-[68rem] mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-[#f4e8ff] dark:bg-gray-600 rounded-lg shadow-md">
              <div className="p-6">
                <Routes>
                  <Route path="overview" element={<DashboardContent />} />
                  <Route path="tasks" element={<TaskList />} />
                  <Route path="calendar" element={<Calendar />} />
                  <Route path="analytics" element={<AnalyticsPage />} />
                  <Route path="pomodoro" element={<PomodoroTimer />} />
                  <Route path="settings" element={<Settings />} />
                  <Route path="profile" element={<UserProfile />} />
                  <Route path="addtask" element={<AddTask />} />
                </Routes>
              </div>
            </div>
          </div>
        </main>
      </div>

      <aside className="hidden lg:block fixed right-0 top-0 bottom-0 w-64 bg-[#d9b4fe] dark:bg-gray-800 dark:border-gray-700 overflow-y-auto">
        <div className="p-4">
          <SideRight />
        </div>
      </aside>
    </div>
  );
}