// import { Calendar, dateFnsLocalizer } from "react-big-calendar";
// import format from "date-fns/format";
// import parse from "date-fns/parse";
// import startOfWeek from "date-fns/startOfWeek";
// import getDay from "date-fns/getDay";
// import enUS from "date-fns/locale/en-US";
// import "react-big-calendar/lib/css/react-big-calendar.css";
// import { useTask } from "../contexts/TaskContext";
// import { motion } from "framer-motion";

// const locales = {
//   "en-US": enUS,
// };

// const localizer = dateFnsLocalizer({
//   format,
//   parse,
//   startOfWeek,
//   getDay,
//   locales,
// });

// export default function CalendarView() {
//   const { tasks } = useTask();

//   const events = tasks.map((task) => ({
//     id: task.id,
//     title: task.title,
//     start: new Date(task.dueDate),
//     end: new Date(task.dueDate),
//     allDay: true,
//     priority: task.priority,
//   }));

//   const eventStyleGetter = (event, start, end, isSelected) => {
//     let backgroundColor = "#950101"; // Default color (medium priority)
//     let textColor = "#FFFFFF";
//     let borderColor = "#3D0000";

//     switch (event.priority) {
//       case "high":
//         backgroundColor = "#FF8BA0";
//         break;
//       case "low":
//         backgroundColor = "#3D0000";
//         break;
//       default:
//         backgroundColor = "#950101";
//     }

//     if (isSelected) {
//       borderColor = "#FFFFFF";
//     }

//     const style = {
//       backgroundColor,
//       borderRadius: "5px",
//       opacity: 0.8,
//       color: textColor,
//       border: `2px solid ${borderColor}`,
//       display: "block",
//       fontWeight: isSelected ? "bold" : "normal",
//       textShadow: isSelected ? "0px 0px 3px #000000" : "none",
//     };

//     return {
//       style: style,
//     };
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//       className="h-screen p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
//     >
//       <Calendar
//         localizer={localizer}
//         events={events}
//         startAccessor="start"
//         endAccessor="end"
//         style={{ height: "100%" }}
//         eventPropGetter={eventStyleGetter}
//         className="rounded-lg overflow-hidden"
//         views={["month", "week", "day"]}
//         tooltipAccessor={(event) =>
//           `${event.title} (${event.priority} priority)`
//         }
//       />
//     </motion.div>
//   );
// }


import { useState, useEffect } from "react";
import { useAppContext } from "../contexts/AppContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
} from "lucide-react";

export default function CalendarView() {
  const { tasks } = useAppContext();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [calendarDays, setCalendarDays] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTasks, setSelectedTasks] = useState([]);

  useEffect(() => {
    generateCalendarDays(currentDate);
  }, [currentDate, tasks]);

  const generateCalendarDays = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    let days = [];
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push({ date: null, tasks: [] });
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const currentDate = new Date(year, month, i);
      const tasksForDay = tasks.filter((task) => {
        const taskDate = new Date(task.dueDate);
        return (
          taskDate.getDate() === i &&
          taskDate.getMonth() === month &&
          taskDate.getFullYear() === year
        );
      });
      days.push({ date: currentDate, tasks: tasksForDay });
    }

    setCalendarDays(days);
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const prevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const getDayClass = (day) => {
    if (!day.date) return "bg-gray-100 dark:bg-gray-800";
    const today = new Date();
    if (day.date.toDateString() === today.toDateString())
      return "bg-blue-100 dark:bg-blue-800";
    return "bg-white dark:bg-gray-700";
  };

  const getTaskColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-500 dark:bg-red-700";
      case "medium":
        return "bg-yellow-500 dark:bg-yellow-700";
      case "low":
        return "bg-green-500 dark:bg-green-700";
      default:
        return "bg-blue-500 dark:bg-blue-700";
    }
  };

  const handleDateClick = (day) => {
    if (day.date) {
      setSelectedDate(day.date);
      setSelectedTasks(day.tasks);
    }
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold">Calendar</CardTitle>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="icon" onClick={prevMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-xl font-semibold">
              {currentDate.toLocaleString("default", {
                month: "long",
                year: "numeric",
              })}
            </span>
            <Button variant="outline" size="icon" onClick={nextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="text-center font-bold p-2">
                {day}
              </div>
            ))}
            {calendarDays?.map((day, index) => (
              <div
                key={index}
                className={`border p-2 h-20 overflow-y-auto ${getDayClass(
                  day
                )} rounded-lg cursor-pointer transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-600`}
                onClick={() => handleDateClick(day)}
              >
                {day.date && (
                  <>
                    <div className="font-semibold">{day.date.getDate()}</div>
                    {day.tasks?.slice(0, 3).map((task) => (
                      <div
                        key={task.id}
                        className={`text-xs p-1 mb-1 text-white rounded ${getTaskColor(
                          task.priority
                        )}`}
                      >
                        {task.title}
                      </div>
                    ))}
                    {day.tasks?.length > 3 && (
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        +{day.tasks?.length - 3} more
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {selectedDate && (
        <Card className="max-w-sm">
          <CardHeader>
            <CardTitle className="text-xl font-semibold flex items-center">
              <CalendarIcon className="mr-2 h-5 w-5" />
              Tasks for {selectedDate.toDateString()}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedTasks.length > 0 ? (
              <ul className="space-y-2">
                {selectedTasks.map((task) => (
                  <li
                    key={task.id}
                    className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded-lg"
                  >
                    <span>{task.title}</span>
                    <div className="flex items-center space-x-2">
                      <Badge variant={task.priority}>{task.priority}</Badge>
                      <Badge
                        variant={
                          task.status === "completed" ? "success" : "default"
                        }
                      >
                        {task.status}
                      </Badge>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 dark:text-gray-400">
                No tasks for this date.
              </p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}