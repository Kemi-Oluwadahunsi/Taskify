import { useState} from "react";
import { useAppContext } from "../contexts/AppContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
} from "chart.js";
import { Pie, Line, Bar } from "react-chartjs-2";
import {
  format,
  subDays,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
} from "date-fns";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title
);

export default function AnalyticsPage() {
  const { tasks} = useAppContext();
  const [timeRange, setTimeRange] = useState("week");

  const getDateRange = () => {
    const today = new Date();
    switch (timeRange) {
      case "week":
        return { start: startOfWeek(today), end: endOfWeek(today) };
      case "month":
        return { start: subDays(today, 30), end: today };
      case "year":
        return { start: subDays(today, 365), end: today };
      default:
        return { start: subDays(today, 7), end: today };
    }
  };

  const filterTasksByDateRange = (tasks, start, end) => {
    return tasks.filter((task) => {
      const taskDate = new Date(task.dueDate);
      return taskDate >= start && taskDate <= end;
    });
  };

  const dateRange = getDateRange();
  const filteredTasks = filterTasksByDateRange(
    tasks,
    dateRange.start,
    dateRange.end
  );

  // Task Status Distribution
  const statusData = {
    labels: ["Completed", "In Progress", "Pending"],
    datasets: [
      {
        data: [
          filteredTasks.filter((task) => task.status === "completed").length,
          filteredTasks.filter((task) => task.status === "in-progress").length,
          filteredTasks.filter((task) => task.status === "pending").length,
        ],
        backgroundColor: ["#4CAF50", "#FFC107", "#F44336"],
      },
    ],
  };

  // Task Priority Distribution
  const priorityData = {
    labels: ["High", "Medium", "Low"],
    datasets: [
      {
        data: [
          filteredTasks.filter((task) => task.priority === "high").length,
          filteredTasks.filter((task) => task.priority === "medium").length,
          filteredTasks.filter((task) => task.priority === "low").length,
        ],
        backgroundColor: ["#F44336", "#FFC107", "#4CAF50"],
      },
    ],
  };

  // Tasks Completed Over Time
  const tasksOverTime = eachDayOfInterval(dateRange).map((date) => ({
    date,
    completed: filteredTasks.filter(
      (task) =>
        task.status === "completed" && new Date(task.completedDate) <= date
    ).length,
  }));

  const tasksOverTimeData = {
    labels: tasksOverTime.map((d) => format(d.date, "MMM dd")),
    datasets: [
      {
        label: "Tasks Completed",
        data: tasksOverTime.map((d) => d.completed),
        borderColor: "#3F51B5",
        tension: 0.1,
      },
    ],
  };

  // Productivity Score
  const productivityScore =
    Math.round(
      (filteredTasks.filter((task) => task.status === "completed").length /
        filteredTasks.length) *
        100
    ) || 0;

  // Task Categories
  const categoryData = {
    labels: [...new Set(filteredTasks.map((task) => task.category))],
    datasets: [
      {
        label: "Tasks per Category",
        data: [...new Set(filteredTasks.map((task) => task.category))].map(
          (category) =>
            filteredTasks.filter((task) => task.category === category).length
        ),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
      },
    ],
  };

  // Time to Complete Tasks
  const timeToComplete = filteredTasks
    .filter((task) => task.status === "completed" && task.completedDate)
    .map((task) => {
      const start = new Date(task.createdAt);
      const end = new Date(task.completedDate);
      return Math.round((end - start) / (1000 * 60 * 60 * 24)); // days
    });

  const avgTimeToComplete =
    timeToComplete.length > 0
      ? Math.round(
          timeToComplete.reduce((a, b) => a + b) / timeToComplete.length
        )
      : 0;

  const timeToCompleteData = {
    labels: ["1 day", "2-3 days", "4-7 days", "1-2 weeks", "2+ weeks"],
    datasets: [
      {
        label: "Time to Complete Tasks",
        data: [
          timeToComplete.filter((t) => t <= 1).length,
          timeToComplete.filter((t) => t > 1 && t <= 3).length,
          timeToComplete.filter((t) => t > 3 && t <= 7).length,
          timeToComplete.filter((t) => t > 7 && t <= 14).length,
          timeToComplete.filter((t) => t > 14).length,
        ],
        backgroundColor: "#4CAF50",
      },
    ],
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold mb-6 text-purple-600 dark:text-purple-400">
        Analytics Dashboard
      </h1>

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Task Insights</h2>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">This Week</SelectItem>
            <SelectItem value="month">This Month</SelectItem>
            <SelectItem value="year">This Year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Task Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <Pie data={statusData} options={{ responsive: true }} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Task Priority Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <Pie data={priorityData} options={{ responsive: true }} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Productivity Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center h-full">
              <div className="text-6xl font-bold text-green-500">
                {productivityScore}%
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Tasks Completed Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <Line data={tasksOverTimeData} options={{ responsive: true }} />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Task Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <Bar data={categoryData} options={{ responsive: true }} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Time to Complete Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <Bar data={timeToCompleteData} options={{ responsive: true }} />
            <p className="mt-4 text-center">
              Average time to complete: {avgTimeToComplete} days
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>User Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="tasks">
            <TabsList>
              <TabsTrigger value="tasks">Tasks Created</TabsTrigger>
              <TabsTrigger value="completed">Tasks Completed</TabsTrigger>
            </TabsList>
            <TabsContent value="tasks">
              <p>Total tasks created: {filteredTasks.length}</p>
              <p>
                Average tasks per day:{" "}
                {Math.round(
                  (filteredTasks.length / (dateRange.end - dateRange.start)) *
                    (1000 * 60 * 60 * 24)
                )}
              </p>
            </TabsContent>
            <TabsContent value="completed">
              <p>
                Total tasks completed:{" "}
                {
                  filteredTasks.filter((task) => task.status === "completed")
                    .length
                }
              </p>
              <p>
                Completion rate:{" "}
                {Math.round(
                  (filteredTasks.filter((task) => task.status === "completed")
                    .length /
                    filteredTasks.length) *
                    100
                )}
                %
              </p>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
