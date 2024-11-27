import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  isToday,
} from "date-fns";

export default function SideCalendar() {
  const today = new Date();
  const start = startOfMonth(today);
  const end = endOfMonth(today);
  const days = eachDayOfInterval({ start, end });

  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="bg-[#f4e8ff] dark:bg-gray-600 py-4 px-2 rounded-xl shadow-lg mt-4">
      <h2 className="text-xl font-bold mb-4">{format(today, "MMMM yyyy")}</h2>
      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekdays.map((day) => (
          <div
            key={day}
            className="text-center text-sm font-medium text-gray-500 dark:text-gray-400"
          >
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: start.getDay() }).map((_, index) => (
          <div key={`empty-${index}`} className="h-8"></div>
        ))}
        {days.map((day) => (
          <div
            key={day.toISOString()}
            className={`h-8 flex items-center justify-center rounded-full text-sm
              ${
                isToday(day)
                  ? "bg-purple-600 text-white"
                  : isSameMonth(day, today)
                  ? "hover:bg-purple-200 dark:hover:bg-purple-800"
                  : "text-gray-400 dark:text-gray-600"
              }
              ${isSameDay(day, today) ? "font-bold" : ""}
            `}
          >
            {format(day, "d")}
          </div>
        ))}
      </div>
    </div>
  );
}
