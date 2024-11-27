// import { useAppContext } from "../contexts/AppContext";

// export default function DashboardContent() {
//   const { tasks, user } = useAppContext();

//   // Calculate task statistics
//   const totalTasks = tasks.length;
//   const completedTasks = tasks.filter(
//     (task) => task.status === "completed"
//   ).length;
//   const pendingTasks = tasks.filter((task) => task.status === "pending").length;
//   const inProgressTasks = tasks.filter(
//     (task) => task.status === "in-progress"
//   ).length;

//   // Get upcoming tasks (due in the next 7 days)
//   const upcomingTasks = tasks
//     .filter((task) => {
//       const dueDate = new Date(task.dueDate);
//       const today = new Date();
//       const sevenDaysFromNow = new Date(
//         today.getTime() + 7 * 24 * 60 * 60 * 1000
//       );
//       return dueDate >= today && dueDate <= sevenDaysFromNow;
//     })
//     .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
//     .slice(0, 1);

//   return (
//     <div className="dashboard-content">
//       <h1 className="text-3xl font-bold mb-6 text-purple-600 dark:text-purple-400">
//         Welcome, {user ? user?.username : "Guest"}!
//       </h1>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
//         <div className="bg-white p-4 rounded-lg shadow">
//           <h2 className="text-xl font-semibold mb-2">Total Tasks</h2>
//           <p className="text-4xl font-bold text-blue-600">{totalTasks}</p>
//         </div>
//         <div className="bg-white p-4 rounded-lg shadow">
//           <h2 className="text-xl font-semibold mb-2">Completed Tasks</h2>
//           <p className="text-4xl font-bold text-green-600">{completedTasks}</p>
//         </div>
//         <div className="bg-white p-4 rounded-lg shadow">
//           <h2 className="text-xl font-semibold mb-2">Pending Tasks</h2>
//           <p className="text-4xl font-bold text-yellow-600">{pendingTasks}</p>
//         </div>
//         <div className="bg-white p-4 rounded-lg shadow">
//           <h2 className="text-xl font-semibold mb-2">In Progress Tasks</h2>
//           <p className="text-4xl font-bold text-purple-600">
//             {inProgressTasks}
//           </p>
//         </div>
//       </div>

//       <div className="bg-white p-6 rounded-lg shadow">
//         <h2 className="text-2xl font-semibold mb-4">Upcoming Tasks</h2>
//         {upcomingTasks.length > 0 ? (
//           <ul className="space-y-4">
//             {upcomingTasks.map((task) => (
//               <li
//                 key={task.id}
//                 className="flex items-center justify-between border-b pb-2"
//               >
//                 <div>
//                   <h3 className="font-semibold">{task.title}</h3>
//                   <p className="text-sm text-gray-600">
//                     Due: {new Date(task.dueDate).toLocaleDateString()}
//                   </p>
//                 </div>
//                 <span
//                   className={`px-2 py-1 rounded-full text-xs font-semibold
//                   ${
//                     task.priority === "high"
//                       ? "bg-red-200 text-red-800"
//                       : task.priority === "medium"
//                       ? "bg-yellow-200 text-yellow-800"
//                       : "bg-green-200 text-green-800"
//                   }`}
//                 >
//                   {task.priority}
//                 </span>
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p className="text-gray-600">No upcoming tasks in the next 7 days.</p>
//         )}
//       </div>
//     </div>
//   );
// }



import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CalendarDays, CheckCircle2, Clock, AlertTriangle } from "lucide-react";
import TaskStatusChart from "./analytics/TaskStatusChart";
import TaskPriorityChart from "./analytics/TaskPriorityChart";
import TaskTimelineChart from "./analytics/TaskTimelineChart";
import { useAppContext } from "@/contexts/AppContext";
import UpcomingTasks from "./UpcomingTasks";

export default function DashboardContent({ user }) {
  const { tasks } = useAppContext();
  const totalTasks = tasks?.length;
  const completedTasks = tasks?.filter(
    (task) => task.status === "completed"
  ).length;
  const pendingTasks = tasks?.filter((task) => task.status === "pending").length;
  const inProgressTasks = tasks?.filter(
    (task) => task.status === "in-progress"
  ).length;
  const completionPercentage =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="dashboard-content space-y-8 ">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold mb-6 text-purple-600 dark:text-purple-400"
      >
        Welcome, {user ? user.username : "Guest"}!
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300 h-36">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-0">
              <CardTitle className="text-lg font-medium text-gray-600 dark:text-gray-400">
                Total Tasks
              </CardTitle>
              <CalendarDays className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-blue-600 dark:text-gray-100">
                {totalTasks}
              </div>
              <Progress value={completionPercentage} className="mt-1" />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {completionPercentage}% completed
              </p>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300 h-36">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-0">
              <CardTitle className="text-lg font-medium text-gray-600 dark:text-gray-400">
                Completed Tasks
              </CardTitle>
              <CheckCircle2 className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-green-600 dark:text-gray-100">
                {completedTasks}
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                {((completedTasks / totalTasks) * 100).toFixed(1)}% of total
                tasks
              </p>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.3 }}
        >
          <Card className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300 h-36">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-0">
              <CardTitle className="text-lg font-medium text-gray-600 dark:text-gray-400">
                In-Progress Tasks
              </CardTitle>
              <Clock className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-purple-600 dark:text-gray-100">
                {inProgressTasks}
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                {((inProgressTasks / totalTasks) * 100).toFixed(1)}% of total
                tasks
              </p>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.4 }}
        >
          <Card className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300 h-36">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-0">
              <CardTitle className="text-lg font-medium text-gray-600 dark:text-gray-400">
                Pending Tasks
              </CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-yellow-600 dark:text-gray-100">
                {pendingTasks}
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                {((pendingTasks / totalTasks) * 100).toFixed(1)}% of total tasks
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.5 }}
        >
          <TaskStatusChart tasks={tasks} />
        </motion.div>
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.6 }}
        >
          <TaskPriorityChart tasks={tasks} />
        </motion.div>
      </div>

      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.7 }}
      >
        <TaskTimelineChart tasks={tasks} />
      </motion.div>

      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.8 }}
        className={``}
      >
        <UpcomingTasks tasks={tasks} />
      </motion.div>
    </div>
  );
}