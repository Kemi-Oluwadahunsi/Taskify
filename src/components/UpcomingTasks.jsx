import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, ClockIcon } from "lucide-react";
import { useAppContext } from "@/contexts/AppContext";

export default function UpcomingTasks() {
    const { tasks} = useAppContext()
  const pendingTasks = tasks?.filter((task) => task.status === "pending");

  return (
    <Card className="bg-white dark:bg-gray-800 shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-purple-700 dark:text-purple-400">
          Upcoming Tasks
        </CardTitle>
      </CardHeader>
      <CardContent>
        {pendingTasks.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">No upcoming tasks.</p>
        ) : (
          <ul className="flex gap-4 border">
            {pendingTasks.map((task) => (
              <li
                key={task.id}
                className=" max-w-[15rem] max-h-[12rem] h-[10rem] flex flex-col justify-between bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-700 dark:to-gray-600 p-4 rounded-lg shadow-md"
              >
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                  {task.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
                  {task.description}
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <CalendarIcon size={16} className="mr-1" />
                    {new Date(task.dueDate).toLocaleDateString()}
                  </div>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <ClockIcon size={16} className="mr-1" />
                    {new Date(task.dueDate).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                  <Badge
                    variant={
                      task.priority === "high"
                        ? "destructive"
                        : task.priority === "medium"
                        ? "warning"
                        : "secondary"
                    }
                  >
                    {task.priority}
                  </Badge>
                </div>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
