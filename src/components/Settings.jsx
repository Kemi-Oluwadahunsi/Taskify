import { useState } from "react";
import { motion } from "framer-motion";
import { useAppContext } from "../contexts/AppContext";
import {
  Moon,
  Sun,
  Download,
  Bell,
  Palette,
  Globe,
  Volume2,
  VolumeX,
  Eye,
  EyeOff,
  LayoutGrid,
  List,
  Zap,
} from "lucide-react";

export default function Settings() {
  const {
    darkMode,
    toggleDarkMode,
    exportData,
    importData,
    notificationSettings,
    setNotificationSettings,
    timeFormat,
    setTimeFormat,
    accentColor,
    setAccentColor,
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
  } = useAppContext();

  const [showImportConfirm, setShowImportConfirm] = useState(false);

  const handleNotificationChange = (setting) => {
    setNotificationSettings((prev) => ({
      ...prev,
      [setting]: !prev[setting],
    }));
  };

  const handleImport = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setShowImportConfirm(true);
    }
  };

  const confirmImport = () => {
    const file = document.getElementById("importData").files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const result = e.target?.result;
        if (typeof result === "string") {
          importData(JSON.parse(result));
          alert("Data imported successfully!");
        }
      } catch (error) {
        alert("Error importing data: " + error.message);
      }
    };
    reader.readAsText(file);
    setShowImportConfirm(false);
  };

  const handlePomodoroSettingChange = (setting, value) => {
    setPomodoroSettings((prev) => ({
      ...prev,
      [setting]: value,
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-gray-800 dark:to-gray-900 rounded-lg shadow-lg"
    >
      <h2 className="text-3xl font-bold mb-6 text-purple-600 dark:text-purple-400">
        Application Settings
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="p-4 bg-white dark:bg-gray-700 rounded-lg shadow"
        >
          <h3 className="text-xl font-semibold mb-4 text-purple-600 dark:text-purple-400 flex items-center">
            <Palette className="mr-2" /> Appearance
          </h3>
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-700 dark:text-gray-300">Dark Mode</span>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={toggleDarkMode}
              className={`p-2 rounded-full ${
                darkMode ? "bg-purple-600" : "bg-gray-200"
              }`}
            >
              {darkMode ? (
                <Moon className="text-white" />
              ) : (
                <Sun className="text-gray-600" />
              )}
            </motion.button>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Accent Color
            </label>
            <select
              value={accentColor}
              onChange={(e) => setAccentColor(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="purple">Purple</option>
              <option value="blue">Blue</option>
              <option value="green">Green</option>
              <option value="red">Red</option>
            </select>
          </div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-700 dark:text-gray-300">
              Privacy Mode
            </span>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setPrivacyMode(!privacyMode)}
              className={`p-2 rounded-full ${
                privacyMode ? "bg-purple-600" : "bg-gray-200"
              }`}
            >
              {privacyMode ? (
                <EyeOff className="text-white" />
              ) : (
                <Eye className="text-gray-600" />
              )}
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="p-4 bg-white dark:bg-gray-700 rounded-lg shadow"
        >
          <h3 className="text-xl font-semibold mb-4 text-purple-600 dark:text-purple-400 flex items-center">
            <Bell className="mr-2" /> Notifications
          </h3>
          <div className="space-y-2">
            {Object.entries(notificationSettings).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <span className="text-gray-700 dark:text-gray-300 capitalize">
                  {key.replace("_", " ")}
                </span>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleNotificationChange(key)}
                  className={`p-2 rounded-full ${
                    value ? "bg-purple-600" : "bg-gray-200"
                  }`}
                >
                  <Bell className={value ? "text-white" : "text-gray-600"} />
                </motion.button>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between mt-4">
            <span className="text-gray-700 dark:text-gray-300">
              Sound Notifications
            </span>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`p-2 rounded-full ${
                soundEnabled ? "bg-purple-600" : "bg-gray-200"
              }`}
            >
              {soundEnabled ? (
                <Volume2 className="text-white" />
              ) : (
                <VolumeX className="text-gray-600" />
              )}
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="p-4 bg-white dark:bg-gray-700 rounded-lg shadow"
        >
          <h3 className="text-xl font-semibold mb-4 text-purple-600 dark:text-purple-400 flex items-center">
            <Globe className="mr-2" /> Preferences
          </h3>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Time Format
            </label>
            <select
              value={timeFormat}
              onChange={(e) => setTimeFormat(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="12">12-hour</option>
              <option value="24">24-hour</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Language
            </label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Calendar Start Day
            </label>
            <select
              value={calendarStartDay}
              onChange={(e) => setCalendarStartDay(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="sunday">Sunday</option>
              <option value="monday">Monday</option>
            </select>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-700 dark:text-gray-300">
              Task View Mode
            </span>
            <div className="flex space-x-2">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setTaskViewMode("grid")}
                className={`p-2 rounded-md ${
                  taskViewMode === "grid"
                    ? "bg-purple-600 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                <LayoutGrid size={20} />
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setTaskViewMode("list")}
                className={`p-2 rounded-md ${
                  taskViewMode === "list"
                    ? "bg-purple-600 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                <List size={20} />
              </motion.button>
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="p-4 bg-white dark:bg-gray-700 rounded-lg shadow"
        >
          <h3 className="text-xl font-semibold mb-4 text-purple-600 dark:text-purple-400 flex items-center">
            <Zap className="mr-2" /> Pomodoro Settings
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Work Duration (minutes)
              </label>
              <input
                type="number"
                value={pomodoroSettings.workDuration}
                onChange={(e) =>
                  handlePomodoroSettingChange(
                    "workDuration",
                    parseInt(e.target.value)
                  )
                }
                className="w-full p-2 border border-gray-300 rounded-md"
                min="1"
                max="60"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Short Break Duration (minutes)
              </label>
              <input
                type="number"
                value={pomodoroSettings.shortBreakDuration}
                onChange={(e) =>
                  handlePomodoroSettingChange(
                    "shortBreakDuration",
                    parseInt(e.target.value)
                  )
                }
                className="w-full p-2 border border-gray-300 rounded-md"
                min="1"
                max="30"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Long Break Duration (minutes)
              </label>
              <input
                type="number"
                value={pomodoroSettings.longBreakDuration}
                onChange={(e) =>
                  handlePomodoroSettingChange(
                    "longBreakDuration",
                    parseInt(e.target.value)
                  )
                }
                className="w-full p-2 border border-gray-300 rounded-md"
                min="1"
                max="60"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Long Break Interval
              </label>
              <input
                type="number"
                value={pomodoroSettings.longBreakInterval}
                onChange={(e) =>
                  handlePomodoroSettingChange(
                    "longBreakInterval",
                    parseInt(e.target.value)
                  )
                }
                className="w-full p-2 border border-gray-300 rounded-md"
                min="1"
                max="10"
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="p-4 bg-white dark:bg-gray-700 rounded-lg shadow md:col-span-2"
        >
          <h3 className="text-xl font-semibold mb-4 text-purple-600 dark:text-purple-400 flex items-center">
            <Download className="mr-2" /> Data Management
          </h3>
          <div className="space-y-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={exportData}
              className="w-full py-2 px-4 bg-green-500 text-white rounded-md flex items-center justify-center"
            >
              <Download className="mr-2" />
              Export Data
            </motion.button>
            <div>
              <label
                htmlFor="importData"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Import Data
              </label>
              <input
                type="file"
                id="importData"
                accept=".json"
                onChange={handleImport}
                className="w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:bg-purple-50 file:text-purple-700
                  hover:file:bg-purple-100"
              />
            </div>
            {showImportConfirm && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 bg-yellow-100 rounded-md"
              >
                <p className="text-yellow-800 mb-2">
                  Are you sure you want to import this data? This will overwrite
                  your current data.
                </p>
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => setShowImportConfirm(false)}
                    className="px-4 py-2 bg-gray-300 rounded-md"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmImport}
                    className="px-4 py-2 bg-yellow-500 text-white rounded-md"
                  >
                    Confirm
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
