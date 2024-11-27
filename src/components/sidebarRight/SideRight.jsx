import SideCalendar from "./SideCalendar";
import TodayTask from "./TodayTask";

const SideRight = () => {
  return (
    <div className="hidden lg:flex flex-col gap-4 py-8">
      <TodayTask />
      <SideCalendar />
    </div>
  );
};

export default SideRight;
