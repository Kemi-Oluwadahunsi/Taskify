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
              <Route path="overview" element={<DashboardContent />} />
              <Route path="tasks" element={<TaskList />} />
              <Route path="calendar" element={<Calendar />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="pomodoro" element={<PomodoroTimer />} />
              <Route path="settings" element={<Settings />} />
              <Route path="profile" element={<UserProfile />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
}