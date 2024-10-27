// import { useEffect, useState } from "react";
// import { useTask } from "../contexts/TaskContext";
// import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
// import TaskFilters from "./TaskFilters";
// import { motion, AnimatePresence } from "framer-motion";

// export default function TaskList() {
//   const { tasks, updateTask, deleteTask, updateSubtasks } = useTask();
//   const [sortedTasks, setSortedTasks] = useState([]);
//   const [filters, setFilters] = useState({
//     search: "",
//     priority: "",
//     status: "",
//   });

//   useEffect(() => {
//     const filteredTasks = tasks.filter((task) => {
//       const matchesSearch = task.title
//         .toLowerCase()
//         .includes(filters.search.toLowerCase());
//       const matchesPriority =
//         !filters.priority || task.priority === filters.priority;
//       const matchesStatus =
//         !filters.status ||
//         (filters.status === "completed" && task.completed) ||
//         (filters.status === "incomplete" && !task.completed);
//       return matchesSearch && matchesPriority && matchesStatus;
//     });

//     const sorted = [...filteredTasks].sort((a, b) => {
//       const priorityOrder = { high: 0, medium: 1, low: 2 };
//       return priorityOrder[a.priority] - priorityOrder[b.priority];
//     });
//     setSortedTasks(sorted);
//   }, [tasks, filters]);

//   const handleComplete = async (taskId) => {
//     try {
//       const task = tasks.find((t) => t.id === taskId);
//       const updatedTask = { ...task, completed: !task.completed };
//       await updateTask(updatedTask);
//     } catch (error) {
//       console.error("Error updating task:", error);
//     }
//   };

//   const handleDelete = async (taskId) => {
//     try {
//       await deleteTask(taskId);
//     } catch (error) {
//       console.error("Error deleting task:", error);
//     }
//   };

//   const handleSubtaskComplete = async (taskId, subtaskIndex) => {
//     try {
//       const task = tasks.find((t) => t.id === taskId);
//       const updatedSubtasks = task.subtasks.map((subtask, index) =>
//         index === subtaskIndex
//           ? { ...subtask, completed: !subtask.completed }
//           : subtask
//       );
//       await updateSubtasks(taskId, updatedSubtasks);
//     } catch (error) {
//       console.error("Error updating subtask:", error);
//     }
//   };

//   const onDragEnd = (result) => {
//     if (!result.destination) return;

//     const items = Array.from(sortedTasks);
//     const [reorderedItem] = items.splice(result.source.index, 1);
//     items.splice(result.destination.index, 0, reorderedItem);

//     setSortedTasks(items);
//   };

//   const getPriorityColor = (priority) => {
//     switch (priority) {
//       case "high":
//         return "bg-red-100 dark:bg-red-900";
//       case "medium":
//         return "bg-yellow-100 dark:bg-yellow-900";
//       case "low":
//         return "bg-green-100 dark:bg-green-900";
//       default:
//         return "bg-gray-100 dark:bg-gray-700";
//     }
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//       className="mt-8"
//     >
//       <h2 className="text-3xl font-bold mb-6 text-primary dark:text-accent text-center">
//         Your Tasks
//       </h2>
//       <TaskFilters filters={filters} setFilters={setFilters} />
//       <DragDropContext onDragEnd={onDragEnd}>
//         <Droppable droppableId="tasks">
//           {(provided) => (
//             <ul
//               {...provided.droppableProps}
//               ref={provided.innerRef}
//               className="space-y-4"
//             >
//               <AnimatePresence>
//                 {sortedTasks.map((task, index) => (
//                   <Draggable
//                     key={task.id}
//                     draggableId={task.id.toString()}
//                     index={index}
//                   >
//                     {(provided) => (
//                       <motion.li
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         exit={{ opacity: 0, y: -20 }}
//                         transition={{ duration: 0.3 }}
//                         ref={provided.innerRef}
//                         {...provided.draggableProps}
//                         {...provided.dragHandleProps}
//                         className={`flex flex-col p-4 rounded-lg shadow-md ${getPriorityColor(
//                           task.priority
//                         )} transition-all duration-200 hover:shadow-lg`}
//                       >
//                         <div className="flex items-center justify-between">
//                           <div className="flex items-center space-x-3">
//                             <input
//                               type="checkbox"
//                               checked={task.completed}
//                               onChange={() => handleComplete(task.id)}
//                               className="h-5 w-5 text-primary focus:ring-primary border-gray-300 rounded-full transition-colors duration-200 cursor-pointer"
//                             />
//                             <span
//                               className={`text-lg font-medium ${
//                                 task.completed
//                                   ? "line-through text-gray-500 dark:text-gray-400"
//                                   : "text-gray-800 dark:text-white"
//                               }`}
//                             >
//                               {task.title}
//                             </span>
//                           </div>
//                           <div className="flex items-center space-x-2">
//                             <span className="text-sm text-gray-600 dark:text-gray-300">
//                               {task.dueDate}
//                             </span>
//                             <motion.button
//                               whileHover={{ scale: 1.1 }}
//                               whileTap={{ scale: 0.9 }}
//                               onClick={() => handleDelete(task.id)}
//                               className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 transition-colors duration-200"
//                             >
//                               Delete
//                             </motion.button>
//                           </div>
//                         </div>
//                         {task.subtasks && task.subtasks.length > 0 && (
//                           <ul className="mt-3 space-y-2">
//                             {task.subtasks.map((subtask, subtaskIndex) => (
//                               <li
//                                 key={subtaskIndex}
//                                 className="flex items-center space-x-2"
//                               >
//                                 <input
//                                   type="checkbox"
//                                   checked={subtask.completed}
//                                   onChange={() =>
//                                     handleSubtaskComplete(task.id, subtaskIndex)
//                                   }
//                                   className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded transition-colors duration-200 cursor-pointer"
//                                 />
//                                 <span
//                                   className={`text-sm ${
//                                     subtask.completed
//                                       ? "line-through text-gray-500 dark:text-gray-400"
//                                       : "text-gray-700 dark:text-gray-200"
//                                   }`}
//                                 >
//                                   {subtask.title}
//                                 </span>
//                               </li>
//                             ))}
//                           </ul>
//                         )}
//                       </motion.li>
//                     )}
//                   </Draggable>
//                 ))}
//               </AnimatePresence>
//               {provided.placeholder}
//             </ul>
//           )}
//         </Droppable>
//       </DragDropContext>
//     </motion.div>
//   );
// }

import { useState } from "react";
import { useAppContext } from "../contexts/AppContext";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

export default function TaskList() {
  const { tasks, addTask, updateTask, deleteTask } = useAppContext();
  const [newTask, setNewTask] = useState({
    title: "",
    status: "pending",
    priority: "medium",
    dueDate: "",
    tags: [],
    file: null,
  });
  const [editingTask, setEditingTask] = useState(null);
  const [filter, setFilter] = useState({
    status: "all",
    priority: "all",
    tag: "all",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editingTask) {
      setEditingTask({ ...editingTask, [name]: value });
    } else {
      setNewTask({ ...newTask, [name]: value });
    }
  };

  const handleTagChange = (e) => {
    const tags = e.target.value.split(",").map((tag) => tag.trim());
    if (editingTask) {
      setEditingTask({ ...editingTask, tags });
    } else {
      setNewTask({ ...newTask, tags });
    }
  };

  const handleFileChange = (e) => {
    if (editingTask) {
      setEditingTask({ ...editingTask, file: e.target.files[0] });
    } else {
      setNewTask({ ...newTask, file: e.target.files[0] });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingTask) {
      updateTask(editingTask);
      setEditingTask(null);
      alert(`Task "${editingTask.title}" has been updated successfully.`);
    } else {
      addTask(newTask);
      setNewTask({
        title: "",
        status: "pending",
        priority: "medium",
        dueDate: "",
        tags: [],
        file: null,
      });
      alert(`New task "${newTask.title}" has been added successfully.`);
    }
  };

  const handleDeleteTask = (taskId) => {
    const taskToDelete = tasks.find((task) => task.id === taskId);
    deleteTask(taskId);
    alert(`Task "${taskToDelete.title}" has been deleted.`);
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(tasks);
    const [reorderedItem] = items.splice(result.source.Taskindex, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    items.forEach((task, index) => updateTask({ ...task, order: index }));
  };

  const filteredTasks = tasks
    .filter((task) => filter.status === "all" || task.status === filter.status)
    .filter(
      (task) => filter.priority === "all" || task.priority === filter.priority
    )
    .filter((task) => filter.tag === "all" || task.tags.includes(filter.tag))
    .sort((a, b) => (a.order || 0) - (b.order || 0));

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">Add Task</h2>
      <form onSubmit={handleSubmit} className="space-y-4 w-3/4">
        <div className="space-y-4 flex flex-col lg:flex-row lg:justify-between">
          <div className="flex flex-col space-y-4">
            <input
              type="text"
              name="title"
              value={editingTask ? editingTask.title : newTask.title}
              onChange={handleInputChange}
              placeholder="Task title"
              required
              className="appearance-none bg-lightnext2 block w-full px-2 py-2 lg:px-3 lg:py-3 rounded-md shadow-sm placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            />
            <div className="flex space-x-2 flex-wrap lg:space-x-4">
              <select
                name="status"
                value={editingTask ? editingTask.status : newTask.status}
                onChange={handleInputChange}
                className="appearance-none bg-lightnext2 block px-2 py-2 lg:px-3 lg:py-3 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              >
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
              <select
                name="priority"
                value={editingTask ? editingTask.priority : newTask.priority}
                onChange={handleInputChange}
                className="appearance-none bg-lightnext2 block px-2 py-2 lg:px-3 lg:py-3 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
              <input
                type="date"
                name="dueDate"
                value={editingTask ? editingTask.dueDate : newTask.dueDate}
                onChange={handleInputChange}
                className="appearance-none mt-4 lg:mt-0 bg-lightnext2 block px-2 py-2 lg:px-3 lg:py-3 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              />
            </div>
          </div>
          <div className="flex flex-col space-y-4">
            <input
              type="text"
              name="tags"
              value={
                editingTask
                  ? editingTask.tags.join(", ")
                  : newTask.tags.join(", ")
              }
              onChange={handleTagChange}
              placeholder="Tags (comma-separated)"
              className="appearance-none bg-lightnext2 block w-full px-2 py-2 lg:px-3 lg:py-3 rounded-md shadow-sm placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm"
            />
            <input
              type="file"
              onChange={handleFileChange}
              className="appearance-none bg-lightnext block w-full px-2 py-2 lg:px-3 lg:py-3 rounded-md shadow-sm placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm"
            />
          </div>
        </div>
        <button
          type="submit"
          className="flex justify-center py-2 px-4 border border-transparent transition duration-300 rounded-md shadow-xl font-medium text-white bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          {editingTask ? "Update Task" : "Add Task"}
        </button>
      </form>
      <div className="pt-[2rem]">
        <h2 className="text-2xl font-bold mb-4">All Tasks</h2>
        <div className="flex flex-wrap space-x-4 mb-4">
          <select
            value={filter.status}
            onChange={(e) => setFilter({ ...filter, status: e.target.value })}
            className="px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          <select
            value={filter.priority}
            onChange={(e) => setFilter({ ...filter, priority: e.target.value })}
            className="px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="all">All Priorities</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <select
            value={filter.tag}
            onChange={(e) => setFilter({ ...filter, tag: e.target.value })}
            className="px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="all">All Tags</option>
            {Array.from(new Set(tasks.flatMap((task) => task.tags))).map(
              (tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              )
            )}
          </select>
        </div>
      </div>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="tasks">
          {(provided) => (
            <ul
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 dark:text-gray-700"
            >
              {filteredTasks.map((task, index) => (
                <Draggable
                  key={task.id}
                  draggableId={task.id.toString()}
                  index={index}
                >
                  {(provided) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="bg-white p-4 rounded shadow-md flex flex-col lg:flex-row justify-between gap-4 lg:gap-0 max-w-lg w-full "
                    >
                      <div className="basis-[60%]">
                        <h3 className="font-bold">{task.title}</h3>
                        <p>Status: {task.status}</p>
                        <p>Priority: {task.priority}</p>
                        <p>Due Date: {task.dueDate}</p>
                        <div className="flex flex-wrap lg:flex-nowrap gap-1 mt-2 w-full">
                          {task.tags.map((tag) => (
                            <span
                              key={tag}
                              className="bg-gray-200 px-2 py-1 rounded-full text-sm"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        {task.fileUrl && (
                          <a
                            href={task.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center mt-2 text-blue-500 hover:underline"
                          >
                            Attachment
                          </a>
                        )}
                      </div>
                      <div className="space-x-2">
                        <button
                          onClick={() => setEditingTask(task)}
                          className="px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteTask(task.id)}
                          className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </div>
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
