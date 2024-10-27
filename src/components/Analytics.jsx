// import { useState, useEffect } from "react";
// import { useAuth } from "../contexts/AuthContext";
// import { firestore } from "../firebase";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";

export default function Analytics() {
//   const [taskData, setTaskData] = useState([]);
//   const { currentUser } = useAuth();

//   useEffect(() => {
//     const fetchTaskData = async () => {
//       const tasksRef = firestore
//         .collection("tasks")
//         .where("userId", "==", currentUser.uid);
//       const snapshot = await tasksRef.get();

//       const data = snapshot.docs.map((doc) => ({
//         ...doc.data(),
//         id: doc.id,
//       }));

//       const statusCounts = data.reduce((acc, task) => {
//         acc[task.status] = (acc[task.status] || 0) + 1;
//         return acc;
//       }, {});

//       const chartData = Object.entries(statusCounts).map(([status, count]) => ({
//         status,
//         count,
//       }));

//       setTaskData(chartData);
//     };

//     fetchTaskData();
//   }, [currentUser]);

//   return (
//     <div className="p-6 bg-white rounded-lg shadow-md">
//       <h2 className="text-2xl font-bold mb-4">Task Analytics</h2>
//       <ResponsiveContainer width="100%" height={300}>
//         <BarChart data={taskData}>
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="status" />
//           <YAxis />
//           <Tooltip />
//           <Legend />
//           <Bar dataKey="count" fill="#8884d8" />
//         </BarChart>
//       </ResponsiveContainer>
//     </div>
//   );
}
