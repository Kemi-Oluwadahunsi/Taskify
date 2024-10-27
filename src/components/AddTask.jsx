// import { useState } from "react";
// import { useTask } from "../context/TaskContext";
// import { createTask } from "../services/api";
// import { motion } from "framer-motion";

//  const AddTask = () => {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [dueDate, setDueDate] = useState("");
//   const [priority, setPriority] = useState("medium");
//   const [subtasks, setSubtasks] = useState([]);
//   const [newSubtask, setNewSubtask] = useState("");
//   const { addTask } = useTask();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const newTask = await createTask({
//         title,
//         description,
//         dueDate,
//         priority,
//         subtasks,
//       });
//       addTask(newTask);
//       setTitle("");
//       setDescription("");
//       setDueDate("");
//       setPriority("medium");
//       setSubtasks([]);
//     } catch (error) {
//       console.error("Error creating task:", error);
//     }
//   };

//   const handleAddSubtask = () => {
//     if (newSubtask.trim()) {
//       setSubtasks([...subtasks, { title: newSubtask, completed: false }]);
//       setNewSubtask("");
//     }
//   };

//   const handleRemoveSubtask = (index) => {
//     setSubtasks(subtasks.filter((_, i) => i !== index));
//   };

//   return (
//     <motion.form
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       onSubmit={handleSubmit}
//       className="mb-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
//     >
//       <h2 className="text-2xl font-bold mb-4 text-primary dark:text-accent">
//         Add New Task
//       </h2>
//       <div className="space-y-4">
//         <input
//           type="text"
//           placeholder="Task title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
//           required
//         />
//         <textarea
//           placeholder="Task description"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
//           rows="3"
//         />
//         <div className="flex space-x-4">
//           <input
//             type="date"
//             value={dueDate}
//             onChange={(e) => setDueDate(e.target.value)}
//             className="flex-1 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
//             required
//           />
//           <select
//             value={priority}
//             onChange={(e) => setPriority(e.target.value)}
//             className="flex-1 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
//           >
//             <option value="low">Low</option>
//             <option value="medium">Medium</option>
//             <option value="high">High</option>
//           </select>
//         </div>
//         <div className="flex space-x-2">
//           <input
//             type="text"
//             placeholder="Add subtask"
//             value={newSubtask}
//             onChange={(e) => setNewSubtask(e.target.value)}
//             className="flex-1 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
//           />
//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             type="button"
//             onClick={handleAddSubtask}
//             className="px-4 py-2 bg-secondary text-white rounded-md hover:bg-opacity-90 transition-colors duration-200"
//           >
//             Add Subtask
//           </motion.button>
//         </div>
//         {subtasks.length > 0 && (
//           <ul className="space-y-2">
//             {subtasks.map((subtask, index) => (
//               <motion.li
//                 key={index}
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ duration: 0.3 }}
//                 className="flex items-center justify-between bg-gray-100 dark:bg-gray-700 p-2 rounded-md"
//               >
//                 <span className="text-gray-800 dark:text-gray-200">
//                   {subtask.title}
//                 </span>
//                 <motion.button
//                   whileHover={{ scale: 1.1 }}
//                   whileTap={{ scale: 0.9 }}
//                   type="button"
//                   onClick={() => handleRemoveSubtask(index)}
//                   className="text-red-500 hover:text-red-700 transition-colors duration-200"
//                 >
//                   Remove
//                 </motion.button>
//               </motion.li>
//             ))}
//           </ul>
//         )}
//       </div>
//       <motion.button
//         whileHover={{ scale: 1.05 }}
//         whileTap={{ scale: 0.95 }}
//         type="submit"
//         className="mt-6 w-full px-6 py-3 bg-primary text-white rounded-full hover:bg-secondary transition-colors duration-200 shadow-md"
//       >
//         Add Task
//       </motion.button>
//     </motion.form>
//   );
// }
// export default AddTask

import { useState } from "react";
import { useTask } from "../contexts/TaskContext";
// import { createTask } from '../services/api'; //Removed as createTask is no longer needed.
import { motion } from "framer-motion";

export default function AddTask() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("medium");
  const [subtasks, setSubtasks] = useState([]);
  const [newSubtask, setNewSubtask] = useState("");
  const { addTask } = useTask();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newTask = await addTask({
        title,
        description,
        dueDate,
        priority,
        subtasks,
      });
      addTask(newTask);
      setTitle("");
      setDescription("");
      setDueDate("");
      setPriority("medium");
      setSubtasks([]);
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const handleAddSubtask = () => {
    if (newSubtask.trim()) {
      setSubtasks([...subtasks, { title: newSubtask, completed: false }]);
      setNewSubtask("");
    }
  };

  const handleRemoveSubtask = (index) => {
    setSubtasks(subtasks.filter((_, i) => i !== index));
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className="mb-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-bold mb-4 text-primary dark:text-accent">
        Add New Task
      </h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          required
        />
        <textarea
          placeholder="Task description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          rows="3"
        />
        <div className="flex space-x-4">
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="flex-1 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            required
          />
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="flex-1 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Add subtask"
            value={newSubtask}
            onChange={(e) => setNewSubtask(e.target.value)}
            className="flex-1 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={handleAddSubtask}
            className="px-4 py-2 bg-secondary text-white rounded-md hover:bg-opacity-90 transition-colors duration-200"
          >
            Add Subtask
          </motion.button>
        </div>
        {subtasks.length > 0 && (
          <ul className="space-y-2">
            {subtasks.map((subtask, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-center justify-between bg-gray-100 dark:bg-gray-700 p-2 rounded-md"
              >
                <span className="text-gray-800 dark:text-gray-200">
                  {subtask.title}
                </span>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  type="button"
                  onClick={() => handleRemoveSubtask(index)}
                  className="text-red-500 hover:text-red-700 transition-colors duration-200"
                >
                  Remove
                </motion.button>
              </motion.li>
            ))}
          </ul>
        )}
      </div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        type="submit"
        className="mt-6 w-full px-6 py-3 bg-primary text-white rounded-full hover:bg-secondary transition-colors duration-200 shadow-md"
      >
        Add Task
      </motion.button>
    </motion.form>
  );
}