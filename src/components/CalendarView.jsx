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

export default function Calendar() {
  const { tasks } = useAppContext();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [calendarDays, setCalendarDays] = useState([]);

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
    if (!day.date) return "bg-gray-100";
    const today = new Date();
    if (day.date.toDateString() === today.toDateString()) return "bg-blue-100";
    return "bg-white";
  };

  const getTaskColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-500";
      case "medium":
        return "bg-yellow-500";
      case "low":
        return "bg-green-500";
      default:
        return "bg-blue-500";
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Calendar</h2>
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={prevMonth}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Previous
        </button>
        <h3 className="text-xl font-semibold">
          {currentDate.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </h3>
        <button
          onClick={nextMonth}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Next
        </button>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="text-center font-bold">
            {day}
          </div>
        ))}
        {calendarDays.map((day, index) => (
          <div
            key={index}
            className={`border p-2 h-24 overflow-y-auto ${getDayClass(day)}`}
          >
            {day.date && (
              <>
                <div className="font-semibold">{day.date.getDate()}</div>
                {day.tasks.map((task) => (
                  <div
                    key={task.id}
                    className={`text-xs p-1 mb-1 text-white rounded ${getTaskColor(
                      task.priority
                    )}`}
                  >
                    {task.title}
                  </div>
                ))}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}