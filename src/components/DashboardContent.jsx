import { useAppContext } from "../contexts/AppContext";

export default function DashboardContent() {
  const { tasks, user } = useAppContext();

  // Calculate task statistics
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(
    (task) => task.status === "completed"
  ).length;
  const pendingTasks = tasks.filter((task) => task.status === "pending").length;
  const inProgressTasks = tasks.filter(
    (task) => task.status === "in-progress"
  ).length;

  // Get upcoming tasks (due in the next 7 days)
  const upcomingTasks = tasks
    .filter((task) => {
      const dueDate = new Date(task.dueDate);
      const today = new Date();
      const sevenDaysFromNow = new Date(
        today.getTime() + 7 * 24 * 60 * 60 * 1000
      );
      return dueDate >= today && dueDate <= sevenDaysFromNow;
    })
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
    .slice(0, 5);

  return (
    <div className="dashboard-content">
      <h1 className="text-3xl font-bold mb-6">
        Welcome, {user ? user.username : "Guest"}!
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Total Tasks</h2>
          <p className="text-4xl font-bold text-blue-600">{totalTasks}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Completed Tasks</h2>
          <p className="text-4xl font-bold text-green-600">{completedTasks}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Pending Tasks</h2>
          <p className="text-4xl font-bold text-yellow-600">{pendingTasks}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">In Progress Tasks</h2>
          <p className="text-4xl font-bold text-purple-600">
            {inProgressTasks}
          </p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4">Upcoming Tasks</h2>
        {upcomingTasks.length > 0 ? (
          <ul className="space-y-4">
            {upcomingTasks.map((task) => (
              <li
                key={task.id}
                className="flex items-center justify-between border-b pb-2"
              >
                <div>
                  <h3 className="font-semibold">{task.title}</h3>
                  <p className="text-sm text-gray-600">
                    Due: {new Date(task.dueDate).toLocaleDateString()}
                  </p>
                </div>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold
                  ${
                    task.priority === "high"
                      ? "bg-red-200 text-red-800"
                      : task.priority === "medium"
                      ? "bg-yellow-200 text-yellow-800"
                      : "bg-green-200 text-green-800"
                  }`}
                >
                  {task.priority}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No upcoming tasks in the next 7 days.</p>
        )}
      </div>
    </div>
  );
}
