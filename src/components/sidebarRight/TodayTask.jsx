import { useEffect, useState } from "react";
import { useAppContext } from "../../contexts/AppContext";
import { format } from "date-fns";

const TodayTask = () => {
  const { tasks } = useAppContext();
  const [todayTask, setTodayTask] = useState(null);

  useEffect(() => {
    const today = new Date().setHours(0, 0, 0, 0);
    const todaysTasks = tasks?.filter(
      (task) => new Date(task?.dueDate).setHours(0, 0, 0, 0) === today
    );
    setTodayTask(todaysTasks[0] || null);
  }, [tasks]);

  return (
    <div className="">
      {todayTask ? (
        <div className="bg-[#390764] text-white dark:bg-gray-600 p-4 rounded-xl shadow-lg">
          <h2 className="text-xl font-bold mb-4">Today&apos;s Task</h2>
          <div className="mb-4">
            <h3 className=" mb-2 text-lg font-semibold">{todayTask?.title}</h3>
            <p className="text-sm dark:text-gray-300">
              {todayTask?.description}
            </p>
          </div>
          <div className="flex justify-between items-center">
            <span
              className={`px-2 py-1 rounded text-sm ${
                todayTask.priority === "high"
                  ? "bg-red-500 text-white"
                  : todayTask?.priority === "medium"
                  ? "bg-yellow-500 text-black"
                  : "bg-green-500 text-white"
              }`}
            >
              {todayTask.priority}
            </span>
            <span
              className={`px-2 py-1 rounded text-sm ${
                todayTask?.status === "completed"
                  ? "bg-green-500 text-white"
                  : todayTask.status === "in-progress"
                  ? "bg-yellow-500 text-black"
                  : "bg-gray-500 text-white"
              }`}
            >
              {todayTask?.status}
            </span>
          </div>
          <p className="mt-4 text-sm text-gray-200 dark:text-gray-400">
            Due: {format(new Date(todayTask?.dueDate), "MMMM d, yyyy")}
          </p>
        </div>
      ) : (
        <section>
          <div className="bg-[#f4e8ff] dark:bg-gray-600 p-4 rounded-xl shadow-lg">
            <h2 className="text-xl font-bold mb-4">Today&apos;s Task</h2>
            <p className="text-gray-600 dark:text-gray-300">
              You don&apos;t have any tasks for today.
            </p>
            <button className="mt-4 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition-colors">
              See All Tasks
            </button>
          </div>
        </section>
      )}
    </div>
  );
};

export default TodayTask;
