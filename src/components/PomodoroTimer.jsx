import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Play,
  Pause,
  RotateCcw,
  Coffee,
  Book,
  // CheckCircle,
} from "lucide-react";

export default function PomodoroTimer() {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState("work"); // 'work', 'shortBreak', 'longBreak'
  const [cycle, setCycle] = useState(0);
  const [task, setTask] = useState("");

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else if (minutes > 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        } else {
          clearInterval(interval);
          handleModeChange();
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, minutes, seconds]);

  const handleModeChange = () => {
    if (mode === "work") {
      if (cycle < 3) {
        setMode("shortBreak");
        setMinutes(5);
      } else {
        setMode("longBreak");
        setMinutes(15);
      }
      setCycle((prevCycle) => (prevCycle + 1) % 4);
    } else {
      setMode("work");
      setMinutes(25);
    }
    setSeconds(0);
    setIsActive(false);
  };

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setMinutes(25);
    setSeconds(0);
    setIsActive(false);
    setMode("work");
    setCycle(0);
  };

  const formatTime = (time) => {
    return time.toString().padStart(2, "0");
  };

  return (
    <div className="p-6 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-gray-800 dark:to-gray-900 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-4 text-purple-600 dark:text-purple-400">
        Pomodoro Timer
      </h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="What are you working on?"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className="w-full px-4 py-2 rounded-md border-2 border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>
      <motion.div
        className="text-6xl font-bold mb-4 text-center"
        animate={{ scale: isActive ? [1, 1.1, 1] : 1 }}
        transition={{
          duration: 0.5,
          repeat: isActive ? Infinity : 0,
          repeatType: "reverse",
        }}
      >
        {formatTime(minutes)}:{formatTime(seconds)}
      </motion.div>
      <div className="flex justify-center space-x-4 mb-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleTimer}
          className="px-6 py-2 bg-purple-500 text-white rounded-full hover:bg-purple-600 transition-colors duration-200 flex items-center"
        >
          {isActive ? <Pause className="mr-2" /> : <Play className="mr-2" />}
          {isActive ? "Pause" : "Start"}
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={resetTimer}
          className="px-6 py-2 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-colors duration-200 flex items-center"
        >
          <RotateCcw className="mr-2" />
          Reset
        </motion.button>
      </div>
      <div className="flex justify-center space-x-4 mb-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setMode("work");
            setMinutes(25);
            setSeconds(0);
            setIsActive(false);
          }}
          className={`px-4 py-2 rounded-full transition-colors duration-200 flex items-center ${
            mode === "work"
              ? "bg-purple-500 text-white"
              : "bg-purple-200 text-purple-700"
          }`}
        >
          <Book className="mr-2" />
          Work
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setMode("shortBreak");
            setMinutes(5);
            setSeconds(0);
            setIsActive(false);
          }}
          className={`px-4 py-2 rounded-full transition-colors duration-200 flex items-center ${
            mode === "shortBreak"
              ? "bg-green-500 text-white"
              : "bg-green-200 text-green-700"
          }`}
        >
          <Coffee className="mr-2" />
          Short Break
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setMode("longBreak");
            setMinutes(15);
            setSeconds(0);
            setIsActive(false);
          }}
          className={`px-4 py-2 rounded-full transition-colors duration-200 flex items-center ${
            mode === "longBreak"
              ? "bg-blue-500 text-white"
              : "bg-blue-200 text-blue-700"
          }`}
        >
          <Coffee className="mr-2" />
          Long Break
        </motion.button>
      </div>
      <div className="text-center text-gray-600 dark:text-gray-400">
        Cycle: {cycle + 1} / 4
      </div>
      {task && (
        <div className="mt-4 p-4 bg-white dark:bg-gray-700 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2 text-purple-600 dark:text-purple-400">
            Current Task:
          </h3>
          <p className="text-gray-800 dark:text-gray-200">{task}</p>
        </div>
      )}
    </div>
  );
}
