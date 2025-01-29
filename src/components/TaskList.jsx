import { useState, useEffect } from "react";
import { useAppContext } from "../contexts/AppContext";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { motion, AnimatePresence } from "framer-motion";
import { Edit, Trash2, X } from "lucide-react";
import AddTask from "./AddTask";
import { toast } from "sonner";

export default function TaskList() {
  const { tasks, updateTask, deleteTask, fetchUserTasks } = useAppContext();
  const [filter, setFilter] = useState({
    status: "all",
    priority: "all",
    tag: "all",
  });
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    console.log("fetchUserTasks in useEffect:", fetchUserTasks);
    if (typeof fetchUserTasks === "function") {
      fetchUserTasks();
    } else {
      console.error("fetchUserTasks is not a function:", fetchUserTasks);
    }
  }, [fetchUserTasks]);
  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(tasks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    items.forEach((task, index) =>
      updateTask(task.id, { ...task, order: index })
    );
  };

  const filteredTasks = tasks
    .filter((task) => filter.status === "all" || task?.status === filter.status)
    .filter(
      (task) => filter.priority === "all" || task?.priority === filter.priority
    )
    .filter((task) => filter.tag === "all" || task?.tags.includes(filter.tag))
    .sort((a, b) => (a.order || 0) - (b.order || 0));

  const priorityColors = {
    low: {
      bg: "bg-green-100",
      text: "text-green-800",
      dot: "bg-green-500",
    },
    medium: {
      bg: "bg-yellow-100",
      text: "text-yellow-800",
      dot: "bg-yellow-500",
    },
    high: {
      bg: "bg-red-100",
      text: "text-red-800",
      dot: "bg-red-500",
    },
  };

  const statusColors = {
    pending: "bg-gray-200 text-gray-800",
    "in-progress": "bg-blue-200 text-blue-800",
    completed: "bg-green-200 text-green-800",
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
  };

  const handleUpdateTask = (updatedTask) => {
    updateTask(updatedTask.id, updatedTask);
    setEditingTask(null);
  };

  const handleStatusChange = async (taskId, newStatus) => {
    const taskToUpdate = tasks?.find((task) => task?.id === taskId);
    if (taskToUpdate) {
      try {
        const updatedTask = { ...taskToUpdate, status: newStatus };
        await updateTask(taskId, updatedTask);
        // Optionally, you can refresh the tasks list after updating
        await fetchUserTasks();
      } catch (error) {
        console.error("Error updating task status:", error);
        // Optionally, show an error message to the user
      }
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      const result = await deleteTask(taskId);
      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error("Failed to delete task");
    }
  };



  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4 text-purple-600 dark:text-purple-400">
        Task List
      </h2>
      <div className="flex flex-wrap gap-4 mb-6">
        <select
          value={filter.status}
          onChange={(e) => setFilter({ ...filter, status: e.target.value })}
          className="px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <option value="all">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <select
          value={filter.priority}
          onChange={(e) => setFilter({ ...filter, priority: e.target.value })}
          className="px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <option value="all">All Priorities</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <select
          value={filter.tag}
          onChange={(e) => setFilter({ ...filter, tag: e.target.value })}
          className="px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <option value="all">All Tags</option>
          {Array.from(new Set(tasks?.flatMap((task) => task?.tags))).map(
            (tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            )
          )}
        </select>
      </div>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="tasks">
          {(provided) => (
            <ul
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {filteredTasks.map((task, index) => (
                <Draggable
                  key={task?.id}
                  draggableId={task?.id.toString()}
                  index={index}
                >
                  {(provided) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="max-h-[16rem] h-full bg-white dark:bg-gray-800 rounded-lg shadow-md flex flex-col justify-between overflow-hidden"
                    >
                      <div
                        className={`${priorityColors[task?.priority].bg} ${
                          priorityColors[task?.priority].text
                        } px-4 py-2 flex item-center justify-between`}
                      >
                        <div className="flex items-center">
                          <div
                            className={`w-2 h-2 rounded-full ${
                              priorityColors[task?.priority].dot
                            } mr-2`}
                          ></div>
                          <span className="font-semibold capitalize">
                            {task?.priority} Priority
                          </span>
                        </div>
                        <select
                          value={task?.status}
                          onChange={(e) =>
                            handleStatusChange(task?.id, e.target.value)
                          }
                          className={`text-xs font-semibold px-2 py-1 rounded ${
                            statusColors[task?.status]
                          }`}
                        >
                          <option value="pending">Pending</option>
                          <option value="in-progress">In Progress</option>
                          <option value="completed">Completed</option>
                        </select>
                      </div>
                      <div className="p-4 flex flex-col h-full justify-between">
                        <h3 className="font-bold text-lg mb-2">
                          {task?.title}
                        </h3>
                        <p className="mb-2 line-clamp-2 text-sm">
                          {task?.description}
                        </p>
                        <p className="text-sm mb-1">Due: {task?.dueDate}</p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {task?.tags.map((tag) => (
                            <span
                              key={tag}
                              className="bg-purple-200 dark:bg-purple-700 text-purple-800 dark:text-purple-200 px-2 py-1 rounded-full text-xs"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex justify-end px-4 py-1 bg-gray-200 dark:bg-gray-700">
                        <button
                          onClick={() => handleEditTask(task)}
                          className="p-2 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition-colors duration-200 mr-2"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteTask(task?.id)}
                          className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-200"
                        >
                          <Trash2 size={16} />
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

      <AnimatePresence>
        {editingTask && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-end items-center mb-4">
                <button
                  onClick={() => setEditingTask(null)}
                  className="text-gray-500 hover:text-gray-700 "
                >
                  <X size={24} />
                </button>
              </div>
              <AddTask
                initialTask={editingTask}
                onSubmit={handleUpdateTask}
                isEditing={true}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

