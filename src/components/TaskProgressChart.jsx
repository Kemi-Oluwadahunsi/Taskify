import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useAppContext } from "../contexts/AppContext";

export default function TaskProgressChart() {
  const { tasks } = useAppContext();

  const statusCounts = tasks.reduce((acc, task) => {
    acc[task.status] = (acc[task.status] || 0) + 1;
    return acc;
  }, {});

  const data = [{ name: "Task Progress", ...statusCounts }];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="completed" fill="#4CAF50" />
        <Bar dataKey="in-progress" fill="#FFC107" />
        <Bar dataKey="pending" fill="#F44336" />
      </BarChart>
    </ResponsiveContainer>
  );
}
