// import { NavLink } from "react-router-dom";
// import { useAuth } from "../contexts/AuthContext";
// import {
//   Home,
//   CheckSquare,
//   Calendar,
//   BarChart2,
//   Clock,
//   Settings,
//   ChevronLeft,
//   ChevronRight,
//   X,

//   // Menu,
//   // X,
// } from "lucide-react";

// const menuItems = [
//   { icon: Home, label: "Dashboard", path: "overview" },
//   { icon: CheckSquare, label: "Tasks", path: "tasks" },
//   { icon: Calendar, label: "Calendar", path: "calendar" },
//   { icon: BarChart2, label: "Analytics", path: "analytics" },
//   { icon: Clock, label: "Pomodoro", path: "pomodoro" },
//   { icon: Settings, label: "Settings", path: "settings" },
// ];

// export default function Sidebar({ isOpen, toggleSidebar, isMobile }) {
//   const { currentUser } = useAuth();

//   return (
//     <>
//       <div
//         className={`fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden ${
//           isOpen && isMobile ? "block" : "hidden"
//         }`}
//         onClick={toggleSidebar}
//       ></div>
//       <aside
//         className={`fixed top-0 z-30 h-screen transition-all duration-300 ease-in-out ${
//           isOpen ? "w-64" : "w-20"
//         } ${
//           isMobile && !isOpen ? "-translate-x-full" : "translate-x-0"
//         } bg-white text-[#350764] overflow-hidden`}
//       >
//         <div className="flex justify-between items-center p-4">
//           {isOpen && (
//             <h1 className="text-2xl font-bold transition-opacity duration-300">
//               TaskMaster
//             </h1>
//           )}

//           {/* Mobile close toggle button */}
//           <button
//             onClick={toggleSidebar}
//             className="text-[#350764] focus:outline-none p-1 rounded-full hover:bg-gray-700 transition-colors duration-200 lg:hidden"
//           >
//             {isOpen && isMobile && <X size={24} />}
//           </button>

//           {/* Desktop toggle button */}
//           <button
//             onClick={toggleSidebar}
//             className="text-[#6921a8] focus:outline-none p-1 bg-[#dcb4fe] rounded-full hover:bg-purple-700 hover:text-[#f4e8ff] transition-colors duration-200 hidden lg:block"
//           >
//             {isOpen && !isMobile ? (
//               <ChevronLeft size={24} />
//             ) : (
//               <ChevronRight size={24} />
//             )}
//           </button>
//         </div>
//         <nav>
//           <ul className="mt-12">
//             {menuItems.map((item) => (
//               <li key={item.path} className="mb-4">
//                 <NavLink
//                   to={item.path}
//                   className={({ isActive }) =>
//                     `flex items-center p-3 text-[#350764] hover:bg-[#ac55f7] hover:text-white text-xl transition-colors duration-200 ${
//                       isActive ? "bg-[#ac55f7]" : ""
//                     }`
//                   }
//                   onClick={() => isMobile && toggleSidebar()}
//                 >
//                   <item.icon
//                     className={`h-6 w-6 transition-all duration-300 ${
//                       isOpen ? "mr-4" : "mx-auto"
//                     }`}
//                   />
//                   <span
//                     className={`transition-opacity duration-300 ${
//                       isOpen ? "opacity-100" : "opacity-0 w-0"
//                     }`}
//                   >
//                     {item.label}
//                   </span>
//                 </NavLink>
//               </li>
//             ))}
//           </ul>
//         </nav>
//         <div className="absolute bottom-0 left-0 right-0 p-4">
//           <NavLink
//             to="profile"
//             className={({ isActive }) =>
//               `flex items-center text-sm hover:bg-[#ac55f7] p-2 rounded transition-colors duration-200 ${
//                 isActive ? "bg-[#ac55f7]" : ""
//               }`
//             }
//             onClick={() => isMobile && toggleSidebar()}
//           >
//             <img
//               src={currentUser?.profileImage || "/images/authbg.webp"}
//               alt="User"
//               className={`w-8 h-8 rounded-full object-cover transition-all duration-300 ${
//                 isOpen ? "mr-3" : "mx-auto"
//               }`}
//             />
//             <div
//               className={`transition-opacity duration-300 ${
//                 isOpen ? "opacity-100" : "opacity-0 w-0"
//               }`}
//             >
//               <p className="font-semibold">
//                 {currentUser?.username || "Username"}
//               </p>
//               <p className="text-gray-400">
//                 {currentUser?.email || "example@gmail.com"}
//               </p>
//             </div>
//           </NavLink>
//         </div>
//       </aside>
//     </>
//   );
// }

import { NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import {
  Home,
  CheckSquare,
  Calendar,
  BarChart2,
  Clock,
  Settings,
  ChevronLeft,
  ChevronRight,
  X,
  PlusCircle,
} from "lucide-react";

const menuItems = [
  { icon: Home, label: "Dashboard", path: "overview" },
  { icon: CheckSquare, label: "Tasks", path: "tasks" },
  { icon: Calendar, label: "Calendar", path: "calendar" },
  { icon: BarChart2, label: "Analytics", path: "analytics" },
  { icon: Clock, label: "Pomodoro", path: "pomodoro" },
  { icon: Settings, label: "Settings", path: "settings" },
];

export default function Sidebar({ isOpen, toggleSidebar, isMobile }) {
  const { currentUser } = useAuth();

  return (
    <>
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden ${
          isOpen && isMobile ? "block" : "hidden"
        }`}
        onClick={toggleSidebar}
      ></div>
      <aside
        className={`fixed top-0 z-30 h-screen transition-all duration-300 ease-in-out px-4 sm:px-0 ${
          isOpen ? "w-64" : "w-20"
        } ${
          isMobile && !isOpen ? "-translate-x-full" : "translate-x-0"
        } bg-white text-[#350764] overflow-hidden`}
      >
        <div className="flex justify-between items-center p-4">
          {isOpen && (
            <h1 className="text-2xl font-bold transition-opacity duration-300">
              Taskify
            </h1>
          )}

          <button
            onClick={toggleSidebar}
            className="text-[#350764] focus:outline-none p-1 rounded-full hover:bg-gray-700 transition-colors duration-200 md:hidden"
          >
            {isOpen && isMobile && <X size={24} />}
          </button>

          <button
            onClick={toggleSidebar}
            className="text-[#6921a8] focus:outline-none p-1 bg-[#dcb4fe] rounded-full hover:bg-purple-700 hover:text-[#f4e8ff] transition-colors duration-200 hidden md:block"
          >
            {isOpen && !isMobile ? (
              <ChevronLeft size={24} />
            ) : (
              <ChevronRight size={24} />
            )}
          </button>
        </div>

        {/* Add Task Button */}
        <div className="px-4 my-6">
          <NavLink
            to="addtask"
            className={({ isActive }) =>
              `flex items-center justify-center gap-2 sm:gap-4 p-2 lg:p-3 bg-[#8e33ea] text-white rounded-lg hover:bg-[#7929d2] transition-colors duration-200 ${
                isActive ? "ring-2 ring-purple-300" : ""
              }`
            }
            onClick={() => isMobile && toggleSidebar()}
          >
            {isOpen && <span className="font-semibold">Creat New Task</span>}
            <PlusCircle className={`h-6 w-6 ${isOpen ? "mr-2" : ""}`} />
          </NavLink>
        </div>

        <nav>
          <ul className="mt-6">
            {menuItems.map((item) => (
              <li key={item.path} className="mb-2">
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center p-3 text-[#350764] hover:bg-[#ac55f7] hover:text-white transition-colors duration-200 ${
                      isActive ? "bg-[#ac55f7] text-white" : ""
                    }`
                  }
                  onClick={() => isMobile && toggleSidebar()}
                >
                  <item.icon
                    className={`h-6 w-6 transition-all duration-300 ${
                      isOpen ? "mr-4" : "mx-auto"
                    }`}
                  />
                  <span
                    className={`transition-opacity duration-300 ${
                      isOpen ? "opacity-100" : "opacity-0 w-0"
                    }`}
                  >
                    {item.label}
                  </span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <NavLink
            to="profile"
            className={({ isActive }) =>
              `flex items-center text-sm hover:bg-[#ac55f7] p-2 rounded transition-colors duration-200 ${
                isActive ? "bg-[#ac55f7]" : ""
              }`
            }
            onClick={() => isMobile && toggleSidebar()}
          >
            <img
              src={currentUser?.profileImage || "/images/authbg.webp"}
              alt="User"
              className={`w-8 h-8 rounded-full object-cover transition-all duration-300 ${
                isOpen ? "mr-3" : "mx-auto"
              }`}
            />
            <div
              className={`transition-opacity duration-300 ${
                isOpen ? "opacity-100" : "opacity-0 w-0"
              }`}
            >
              <p className="font-semibold">
                {currentUser?.username || "Kemi Dahunsi"}
              </p>
              <p className="text-gray-950 text-[0.7em]">
                {currentUser?.email || "oluwakemioluwadahunsi@gmail.com"}
              </p>
            </div>
          </NavLink>
        </div>
      </aside>
    </>
  );
}
