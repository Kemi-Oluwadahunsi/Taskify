


// import { useAppContext } from "../contexts/AppContext";
// import { motion } from "framer-motion";
// import { Clock, Plus, Minus, X, Tag } from "lucide-react";
// import { format } from "date-fns";
// import { useState, useEffect } from "react";

// const commonTags = [
//   "Work",
//   "Personal",
//   "Urgent",
//   "Home",
//   "Health",
//   "Finance",
//   "Study",
//   "Project",
// ];

// export default function AddTask({ initialTask, onSubmit, isEditing }) {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [dueDate, setDueDate] = useState("");
//   const [priority, setPriority] = useState("medium");
//   const [status, setStatus] = useState("pending");
//   const [subtasks, setSubtasks] = useState([]);
//   const [newSubtask, setNewSubtask] = useState("");
//   const [estimatedTime, setEstimatedTime] = useState({ hours: 0, minutes: 0 });
//   const [tags, setTags] = useState([]);
//   const [newTag, setNewTag] = useState("");
//   const { addTask, updateTask } = useAppContext();

//   useEffect(() => {
//     if (initialTask) {
//       setTitle(initialTask.title);
//       setDescription(initialTask.description);
//       setDueDate(initialTask.dueDate);
//       setPriority(initialTask.priority);
//       setStatus(initialTask.status || "pending");
//       setSubtasks(initialTask.subtasks || []);
//       setEstimatedTime(initialTask.estimatedTime || { hours: 0, minutes: 0 });
//       setTags(initialTask.tags || []);
//     }
//   }, [initialTask]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const taskData = {
//         title,
//         description,
//         dueDate: dueDate ? format(new Date(dueDate), "yyyy-MM-dd") : null,
//         priority,
//         status,
//         subtasks,
//         estimatedTime,
//         tags,
//         createdAt: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
//       };

//       if (isEditing) {
//         await updateTask({ ...initialTask, ...taskData });
//       } else {
//         await addTask(taskData);
//       }

//       onSubmit(taskData);
//       if (!isEditing) resetForm();
//     } catch (error) {
//       console.error("Error creating/updating task:", error);
//     }
//   };

//   const resetForm = () => {
//     setTitle("");
//     setDescription("");
//     setDueDate("");
//     setPriority("medium");
//     setStatus("pending");
//     setSubtasks([]);
//     setEstimatedTime({ hours: 0, minutes: 0 });
//     setTags([]);
//     setNewTag("");
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

//   const handleAddTag = (tag) => {
//     if (tag && !tags.includes(tag)) {
//       setTags([...tags, tag]);
//       setNewTag("");
//     }
//   };

//   const handleRemoveTag = (tag) => {
//     setTags(tags.filter((t) => t !== tag));
//   };

//   const incrementTime = (type) => {
//     setEstimatedTime((prev) => ({
//       ...prev,
//       [type]: prev[type] + (type === "hours" ? 1 : 15),
//     }));
//   };

//   const decrementTime = (type) => {
//     setEstimatedTime((prev) => ({
//       ...prev,
//       [type]: Math.max(0, prev[type] - (type === "hours" ? 1 : 15)),
//     }));
//   };

//   return (
//     <motion.form
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       onSubmit={handleSubmit}
//       className={`${
//         isEditing ? "mx-0" : "mx-8"
//       } p-6 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-gray-800 dark:to-gray-900 rounded-lg shadow-lg`}
//     >
//       <h2 className="text-3xl font-bold mb-6 text-purple-600 dark:text-purple-400">
//         {isEditing ? "Edit Task" : "Create a New Task"}
//       </h2>
//       <div className="space-y-6">
//         <input
//           type="text"
//           placeholder="Task title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           className="w-full px-4 py-3 rounded-md border-2 border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
//           required
//         />
//         <textarea
//           placeholder="Task description"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           className="w-full px-4 py-3 rounded-md border-2 border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
//           rows="3"
//         />
//         <div className="flex space-x-4">
//           <div className="flex-1">
//             <label
//               htmlFor="dueDate"
//               className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
//             >
//               Due Date
//             </label>
//             <input
//               id="dueDate"
//               type="date"
//               value={dueDate}
//               onChange={(e) => setDueDate(e.target.value)}
//               className="w-full px-4 py-2 rounded-md border-2 border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
//               required
//             />
//           </div>
//           <div className="flex-1">
//             <label
//               htmlFor="priority"
//               className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
//             >
//               Priority
//             </label>
//             <select
//               id="priority"
//               value={priority}
//               onChange={(e) => setPriority(e.target.value)}
//               className="w-full px-4 py-2 rounded-md border-2 border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
//             >
//               <option value="low">Low</option>
//               <option value="medium">Medium</option>
//               <option value="high">High</option>
//             </select>
//           </div>
//           <div className="flex-1">
//             <label
//               htmlFor="status"
//               className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
//             >
//               Status
//             </label>
//             <select
//               id="status"
//               value={status}
//               onChange={(e) => setStatus(e.target.value)}
//               className="w-full px-4 py-2 rounded-md border-2 border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
//             >
//               <option value="pending">Pending</option>
//               <option value="in-progress">In Progress</option>
//               <option value="completed">Completed</option>
//             </select>
//           </div>
//         </div>
//         <div className="flex items-center space-x-4 bg-white dark:bg-gray-800 p-4 rounded-md shadow">
//           <Clock className="text-purple-500 dark:text-purple-400" />
//           <div className="flex items-center space-x-2">
//             <button
//               type="button"
//               onClick={() => decrementTime("hours")}
//               className="p-1 bg-purple-200 dark:bg-purple-700 rounded"
//             >
//               <Minus size={16} />
//             </button>
//             <span className="w-8 text-center">{estimatedTime.hours}</span>
//             <button
//               type="button"
//               onClick={() => incrementTime("hours")}
//               className="p-1 bg-purple-200 dark:bg-purple-700 rounded"
//             >
//               <Plus size={16} />
//             </button>
//             <span>hours</span>
//           </div>
//           <div className="flex items-center space-x-2">
//             <button
//               type="button"
//               onClick={() => decrementTime("minutes")}
//               className="p-1 bg-purple-200 dark:bg-purple-700 rounded"
//             >
//               <Minus size={16} />
//             </button>
//             <span className="w-8 text-center">{estimatedTime.minutes}</span>
//             <button
//               type="button"
//               onClick={() => incrementTime("minutes")}
//               className="p-1 bg-purple-200 dark:bg-purple-700 rounded"
//             >
//               <Plus size={16} />
//             </button>
//             <span>minutes</span>
//           </div>
//         </div>
//         <div className="space-y-2">
//           <div className="flex space-x-2">
//             <input
//               type="text"
//               placeholder="Add subtask"
//               value={newSubtask}
//               onChange={(e) => setNewSubtask(e.target.value)}
//               className="flex-1 px-4 py-2 rounded-md border-2 border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
//             />
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               type="button"
//               onClick={handleAddSubtask}
//               className="px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition-colors duration-200"
//             >
//               Add Subtask
//             </motion.button>
//           </div>
//           {subtasks.length > 0 && (
//             <ul className="space-y-2">
//               {subtasks.map((subtask, index) => (
//                 <motion.li
//                   key={index}
//                   initial={{ opacity: 0, x: -20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   transition={{ duration: 0.3 }}
//                   className="flex items-center justify-between bg-white dark:bg-gray-700 p-2 rounded-md shadow"
//                 >
//                   <span className="text-gray-800 dark:text-gray-200">
//                     {subtask.title}
//                   </span>
//                   <motion.button
//                     whileHover={{ scale: 1.1 }}
//                     whileTap={{ scale: 0.9 }}
//                     type="button"
//                     onClick={() => handleRemoveSubtask(index)}
//                     className="text-red-500 hover:text-red-700 transition-colors duration-200"
//                   >
//                     <X size={16} />
//                   </motion.button>
//                 </motion.li>
//               ))}
//             </ul>
//           )}
//         </div>
//         <div className="space-y-2">
//           <div className="flex flex-wrap gap-2">
//             {commonTags.map((tag) => (
//               <motion.button
//                 key={tag}
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 type="button"
//                 onClick={() => handleAddTag(tag)}
//                 className={`px-3 py-1 rounded-full text-sm ${
//                   tags.includes(tag)
//                     ? "bg-purple-500 text-white"
//                     : "bg-purple-200 text-purple-700 dark:bg-purple-700 dark:text-purple-200"
//                 }`}
//               >
//                 {tag}
//               </motion.button>
//             ))}
//           </div>
//           <div className="flex space-x-2">
//             <input
//               type="text"
//               placeholder="Add custom tag"
//               value={newTag}
//               onChange={(e) => setNewTag(e.target.value)}
//               className="flex-1 px-4 py-2 rounded-md border-2 border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
//             />
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               type="button"
//               onClick={() => handleAddTag(newTag)}
//               className="px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition-colors duration-200"
//             >
//               Add Tag
//             </motion.button>
//           </div>
//           {tags.length > 0 && (
//             <div className="flex flex-wrap gap-2 mt-2">
//               {tags.map((tag, index) => (
//                 <motion.span
//                   key={index}
//                   initial={{ opacity: 0, scale: 0.8 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   transition={{ duration: 0.3 }}
//                   className="inline-flex items-center bg-purple-500 text-white px-2 py-1 rounded-full text-sm"
//                 >
//                   <Tag size={14} className="mr-1" />
//                   {tag}
//                   <button
//                     type="button"
//                     onClick={() => handleRemoveTag(tag)}
//                     className="ml-1 focus:outline-none"
//                   >
//                     <X size={14} />
//                   </button>
//                 </motion.span>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//       <motion.button
//         whileHover={{ scale: 1.05 }}
//         whileTap={{ scale: 0.95 }}
//         type="submit"
//         className="mt-6 w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full hover:from-purple-600 hover:to-pink-600 transition-colors duration-200 shadow-md"
//       >
//         {isEditing ? "Update Task" : "Create Task"}
//       </motion.button>
//     </motion.form>
//   );
// }

import { useAppContext } from "../contexts/AppContext";
import { motion } from "framer-motion";
import { Clock, Plus, Minus, X, Tag } from "lucide-react";
import { format } from "date-fns";
import { useState, useEffect } from "react";

const commonTags = [
  "Work",
  "Personal",
  "Urgent",
  "Home",
  "Health",
  "Finance",
  "Study",
  "Project",
];

export default function AddTask({ initialTask, onSubmit, isEditing }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("medium");
  const [status, setStatus] = useState("pending");
  const [subtasks, setSubtasks] = useState([]);
  const [newSubtask, setNewSubtask] = useState("");
  const [estimatedTime, setEstimatedTime] = useState({ hours: 0, minutes: 0 });
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");
  const { addTask, updateTask } = useAppContext();

  useEffect(() => {
    if (initialTask) {
      setTitle(initialTask.title);
      setDescription(initialTask.description);
      setDueDate(initialTask.dueDate);
      setPriority(initialTask.priority);
      setStatus(initialTask.status || "pending");
      setSubtasks(initialTask.subtasks || []);
      setEstimatedTime(initialTask.estimatedTime || { hours: 0, minutes: 0 });
      setTags(initialTask.tags || []);
    }
  }, [initialTask]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const taskData = {
        title,
        description,
        dueDate: dueDate ? format(new Date(dueDate), "yyyy-MM-dd") : null,
        priority,
        status,
        subtasks,
        estimatedTime,
        tags,
        createdAt: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
      };

      if (isEditing) {
        await updateTask({ ...initialTask, ...taskData });
      } else {
        await addTask(taskData);
      }

      onSubmit(taskData);
      if (!isEditing) resetForm();
    } catch (error) {
      console.error("Error creating/updating task:", error);
    }
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setDueDate("");
    setPriority("medium");
    setStatus("pending");
    setSubtasks([]);
    setEstimatedTime({ hours: 0, minutes: 0 });
    setTags([]);
    setNewTag("");
    setNewSubtask("");
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

  const handleAddTag = (tag) => {
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag]);
      setNewTag("");
    }
  };

  const handleRemoveTag = (tag) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const incrementTime = (type) => {
    setEstimatedTime((prev) => ({
      ...prev,
      [type]: prev[type] + (type === "hours" ? 1 : 15),
    }));
  };

  const decrementTime = (type) => {
    setEstimatedTime((prev) => ({
      ...prev,
      [type]: Math.max(0, prev[type] - (type === "hours" ? 1 : 15)),
    }));
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className={`${
        isEditing ? "mx-0" : "mx-8"
      } p-6 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-gray-800 dark:to-gray-900 rounded-lg shadow-lg`}
    >
      <h2 className="text-3xl font-bold mb-6 text-purple-600 dark:text-purple-400">
        {isEditing ? "Edit Task" : "Create a New Task"}
      </h2>
      <div className="space-y-6">
        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-3 rounded-md border-2 border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          required
        />
        <textarea
          placeholder="Task description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-3 rounded-md border-2 border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          rows="3"
        />
        <div className="flex space-x-4">
          <div className="flex-1">
            <label
              htmlFor="dueDate"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Due Date
            </label>
            <input
              id="dueDate"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full px-4 py-2 rounded-md border-2 border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>
          <div className="flex-1">
            <label
              htmlFor="priority"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Priority
            </label>
            <select
              id="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full px-4 py-2 rounded-md border-2 border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div className="flex-1">
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Status
            </label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-4 py-2 rounded-md border-2 border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>
        <div className="flex items-center space-x-4 bg-white dark:bg-gray-800 p-4 rounded-md shadow">
          <Clock className="text-purple-500 dark:text-purple-400" />
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={() => decrementTime("hours")}
              className="p-1 bg-purple-200 dark:bg-purple-700 rounded"
            >
              <Minus size={16} />
            </button>
            <span className="w-8 text-center">{estimatedTime.hours}</span>
            <button
              type="button"
              onClick={() => incrementTime("hours")}
              className="p-1 bg-purple-200 dark:bg-purple-700 rounded"
            >
              <Plus size={16} />
            </button>
            <span>hours</span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={() => decrementTime("minutes")}
              className="p-1 bg-purple-200 dark:bg-purple-700 rounded"
            >
              <Minus size={16} />
            </button>
            <span className="w-8 text-center">{estimatedTime.minutes}</span>
            <button
              type="button"
              onClick={() => incrementTime("minutes")}
              className="p-1 bg-purple-200 dark:bg-purple-700 rounded"
            >
              <Plus size={16} />
            </button>
            <span>minutes</span>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="Add subtask"
              value={newSubtask}
              onChange={(e) => setNewSubtask(e.target.value)}
              className="flex-1 px-4 py-2 rounded-md border-2 border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={handleAddSubtask}
              className="px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition-colors duration-200"
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
                  className="flex items-center justify-between bg-white dark:bg-gray-700 p-2 rounded-md shadow"
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
                    <X size={16} />
                  </motion.button>
                </motion.li>
              ))}
            </ul>
          )}
        </div>
        <div className="space-y-2">
          <div className="flex flex-wrap gap-2">
            {commonTags.map((tag) => (
              <motion.button
                key={tag}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={() => handleAddTag(tag)}
                className={`px-3 py-1 rounded-full text-sm ${
                  tags.includes(tag)
                    ? "bg-purple-500 text-white"
                    : "bg-purple-200 text-purple-700 dark:bg-purple-700 dark:text-purple-200"
                }`}
              >
                {tag}
              </motion.button>
            ))}
          </div>
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="Add custom tag"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              className="flex-1 px-4 py-2 rounded-md border-2 border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={() => handleAddTag(newTag)}
              className="px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition-colors duration-200"
            >
              Add Tag
            </motion.button>
          </div>
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {tags.map((tag, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="inline-flex items-center bg-purple-500 text-white px-2 py-1 rounded-full text-sm"
                >
                  <Tag size={14} className="mr-1" />
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="ml-1 focus:outline-none"
                  >
                    <X size={14} />
                  </button>
                </motion.span>
              ))}
            </div>
          )}
        </div>
      </div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        type="submit"
        className="mt-6 w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full hover:from-purple-600 hover:to-pink-600 transition-colors duration-200 shadow-md"
      >
        {isEditing ? "Update Task" : "Create Task"}
      </motion.button>
    </motion.form>
  );
}                               