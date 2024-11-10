// import { useState } from "react";
// import { Link, useLocation } from "react-router-dom";

// const menuItems = [
//   { icon: "📊", label: "Dashboard", path: "/" },
//   { icon: "✅", label: "Tasks", path: "/tasks" },
//   { icon: "📅", label: "Calendar", path: "/calendar" },
//   { icon: "📈", label: "Analytics", path: "/analytics" },
//   { icon: "⏱️", label: "Pomodoro", path: "/pomodoro" },
//   { icon: "⚙️", label: "Settings", path: "/settings" },
// ];

// export default function Sidebar() {
//  /   const toggleSidebar = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <div
//       className={`sidebar bg-gray-800 text-white h-screen ${
//         isOpen ? "w-64" : "w-20"
//       } transition-all duration-300 ease-in-out`}
//     >
//       <div className="flex justify-between items-center p-4">
//         <h1 className={`text-2xl font-bold ${isOpen ? "block" : "hidden"}`}>
//           TaskMaster
//         </h1>
//         <button
//           onClick={toggleSidebar}
//           className="text-white focus:outline-none"
//         >
//           {isOpen ? "◀" : "▶"}
//         </button>
//       </div>
//       <nav>
//         <ul className="mt-6">
//           {menuItems.map((item) => (
//             <li key={item.path} className="mb-2">
//               <Link
//                 to={item.path}
//                 className={`flex items-center p-3 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200 ${
//                   location.pathname === item.path
//                     ? "bg-gray-700 text-white"
//                     : ""
//                 }`}
//               >
//                 <span className="text-2xl mr-4">{item.icon}</span>
//                 <span className={`${isOpen ? "block" : "hidden"}`}>
//                   {item.label}
//                 </span>
//               </Link>
//             </li>
//           ))}
//         </ul>
//       </nav>
//       <div
//         className={`absolute bottom-0 left-0 right-0 p-4 ${
//           isOpen ? "block" : "hidden"
//         }`}
//       >
//         <div className="flex items-center text-sm">
//           <img
//             src="/placeholder.svg?height=32&width=32"
//             alt="User"
//             className="w-8 h-8 rounded-full mr-3"
//           />
//           <div>
//             <p className="font-semibold">John Doe</p>
//             <p className="text-gray-400">john@example.com</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// import { NavLink } from "react-router-dom";
// import { useAuth } from "../contexts/AuthContext";
// import {
//   Home,
//   CheckSquare,
//   Calendar,
//   BarChart2,
//   Clock,
//   Settings,
// //   User,
// } from "lucide-react";
// import { useState } from "react";

// const menuItems = [
//   { icon: Home, label: "Dashboard", path: "/" },
//   { icon: CheckSquare, label: "Tasks", path: "/tasks" },
//   { icon: Calendar, label: "Calendar", path: "/calendar" },
//   { icon: BarChart2, label: "Analytics", path: "/analytics" },
//   { icon: Clock, label: "Pomodoro", path: "/pomodoro" },
//   { icon: Settings, label: "Settings", path: "/settings" },
// ];

// export default function Sidebar() {
//   const [isOpen, setIsOpen ] = useState(false)
//   const { currentUser } = useAuth();

//   const toggleSidebar = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <>
//       <div
//         className={`fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden ${
//           isOpen ? "block" : "hidden"
//         }`}
//         onClick={toggleSidebar}
//       ></div>
//       <aside
//         className={`fixed top-0 left-0 z-30 w-64 h-screen transition-transform ${
//           isOpen ? "translate-x-0" : "-translate-x-full"
//         } md:relative md:translate-x-0 bg-gray-800 text-white`}
//       >
//         <div className="flex justify-between items-center p-4">
//           <h1 className="text-2xl font-bold">TaskMaster</h1>
//           <button
//           onClick={toggleSidebar}
//           className="text-white focus:outline-none"
//         >
//           {isOpen ? "◀" : "▶"}
//         </button>
//         </div>
//         <nav>
//           <ul className="mt-6">
//             {menuItems.map((item) => (
//               <li key={item.path} className="mb-2">
//                 <NavLink
//                   to={item.path}
//                   className={({ isActive }) =>
//                     `flex items-center p-3 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200 ${
//                       isActive ? "bg-gray-700 text-white" : ""
//                     }`
//                   }
//                   onClick={() => {
//                     if (window.innerWidth < 768) {
//                       toggleSidebar();
//                     }
//                   }}
//                 >
//                   <item.icon className="mr-4 h-6 w-6" />
//                   <span>{item.label}</span>
//                 </NavLink>
//               </li>
//             ))}
//           </ul>
//         </nav>
//         <div className="absolute bottom-0 left-0 right-0 p-4">
//           <NavLink
//             to="/profile"
//             className={({ isActive }) =>
//               `flex items-center text-sm hover:bg-gray-700 p-2 rounded transition-colors duration-200 ${
//                 isActive ? "bg-gray-700" : ""
//               }`
//             }
//             onClick={() => {
//               if (window.innerWidth < 768) {
//                 toggleSidebar();
//               }
//             }}
//           >
//             <img
//               src={
//                 currentUser.profileImage ||
//                 "/placeholder.svg?height=32&width=32"
//               }
//               alt="User"
//               className="w-8 h-8 rounded-full mr-3 object-cover"
//             />
//             <div>
//               <p className="font-semibold">{currentUser.username}</p>
//               <p className="text-gray-400">{currentUser.email}</p>
//             </div>
//           </NavLink>
//         </div>
//       </aside>
//     </>
//   );
// }

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
//   // User,
// } from "lucide-react";
// import { useState } from "react";

// const menuItems = [
//   { icon: Home, label: "Dashboard", path: "/" },
//   { icon: CheckSquare, label: "Tasks", path: "/tasks" },
//   { icon: Calendar, label: "Calendar", path: "/calendar" },
//   { icon: BarChart2, label: "Analytics", path: "/analytics" },
//   { icon: Clock, label: "Pomodoro", path: "/pomodoro" },
//   { icon: Settings, label: "Settings", path: "/settings" },
// ];

// export default function Sidebar() {
//   const [isOpen, setIsOpen] = useState(true);
//   const { currentUser } = useAuth();

//   const toggleSidebar = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <>
//       <div
//         className={`fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden ${
//           isOpen ? "block" : "hidden"
//         }`}
//         onClick={toggleSidebar}
//       ></div>
//       <aside
//         className={`fixed top-0 left-0 z-30 w-64 h-screen transition-all duration-300 ease-in-out${
//           isOpen ? "translate-x-0 w-64" : "-translate-x-full w-20"
//         } md:relative md:translate-x-0 bg-gray-800 text-white`}
//       >
//         <div className="flex justify-between items-center p-4">
//           {isOpen && <h1 className="text-2xl font-bold">TaskMaster</h1>}
//           <button
//             onClick={toggleSidebar}
//             className="text-white focus:outline-none p-1 rounded-full hover:bg-gray-700 transition-colors duration-200"
//           >
//             {isOpen ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
//           </button>
//         </div>
//         <nav>
//           <ul className="mt-6">
//             {menuItems.map((item) => (
//               <li key={item.path} className="mb-2">
//                 <NavLink
//                   to={item.path}
//                   className={({ isActive }) =>
//                     `flex items-center p-3 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200 ${
//                       isActive ? "bg-gray-700 text-white" : ""
//                     }`
//                   }
//                 >
//                   <item.icon
//                     className={`h-6 w-6 ${isOpen ? "mr-4" : "mx-auto"}`}
//                   />
//                   {isOpen && <span>{item.label}</span>}
//                 </NavLink>
//               </li>
//             ))}
//           </ul>
//         </nav>
//         <div className="absolute bottom-0 left-0 right-0 p-4">
//           <NavLink
//             to="/profile"
//             className={({ isActive }) =>
//               `flex items-center text-sm hover:bg-gray-700 p-2 rounded transition-colors duration-200 ${
//                 isActive ? "bg-gray-700" : ""
//               }`
//             }
//           >
//             <img
//               src={
//                 currentUser.profileImage ||
//                 "/placeholder.svg?height=32&width=32"
//               }
//               alt="User"
//               className={`w-8 h-8 rounded-full object-cover ${
//                 isOpen ? "mr-3" : "mx-auto"
//               }`}
//             />
//             {isOpen && (
//               <div>
//                 <p className="font-semibold">{currentUser.username}</p>
//                 <p className="text-gray-400">{currentUser.email}</p>
//               </div>
//             )}
//           </NavLink>
//         </div>
//       </aside>
//     </>
//   );
// }

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
// } from "lucide-react";
// import { useState } from "react";

// const menuItems = [
//   { icon: Home, label: "Dashboard", path: "/" },
//   { icon: CheckSquare, label: "Tasks", path: "/tasks" },
//   { icon: Calendar, label: "Calendar", path: "/calendar" },
//   { icon: BarChart2, label: "Analytics", path: "/analytics" },
//   { icon: Clock, label: "Pomodoro", path: "/pomodoro" },
//   { icon: Settings, label: "Settings", path: "/settings" },
// ];

// export default function Sidebar() {
//   const [isOpen, setIsOpen] = useState(true);
//   const { currentUser } = useAuth();

//   const toggleSidebar = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <>
//       <div
//         className={`lg:fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden ${
//           isOpen ? "block" : "hidden"
//         }`}
//         onClick={toggleSidebar}
//       ></div>
//       <aside
//         className={`fixed top-0 left-0 z-30 h-screen transition-all duration-300 ease-in-out ${
//           isOpen ? "w-64" : "w-20"
//         } md:relative bg-gray-800 text-white overflow-hidden`}
//       >
//         <div className="flex justify-between items-center p-4">
//           <h1
//             className={`text-2xl font-bold transition-opacity duration-300 ${
//               isOpen ? "opacity-100" : "opacity-0"
//             }`}
//           >
//             TaskMaster
//           </h1>
//           <button
//             onClick={toggleSidebar}
//             className="text-white focus:outline-none p-1 rounded-full hover:bg-gray-700 transition-colors duration-200"
//           >
//             {isOpen ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
//           </button>
//         </div>
//         <nav>
//           <ul className="mt-6">
//             {menuItems.map((item) => (
//               <li key={item.path} className="mb-2">
//                 <NavLink
//                   to={item.path}
//                   className={({ isActive }) =>
//                     `flex items-center p-3 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200 ${
//                       isActive ? "bg-gray-700 text-white" : ""
//                     }`
//                   }
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
//             to="/profile"
//             className={({ isActive }) =>
//               `flex items-center text-sm hover:bg-gray-700 p-2 rounded transition-colors duration-200 ${
//                 isActive ? "bg-gray-700" : ""
//               }`
//             }
//           >
//             <img
//               src={
//                 currentUser.profileImage ||
//                 "/placeholder.svg?height=32&width=32"
//               }
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
//               <p className="font-semibold">{currentUser.username}</p>
//               <p className="text-gray-400">{currentUser.email}</p>
//             </div>
//           </NavLink>
//         </div>
//       </aside>
//     </>
//   );
// }

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
//   Menu,
// } from "lucide-react";
// import { useState, useEffect } from "react";

// const menuItems = [
//   { icon: Home, label: "Dashboard", path: "/" },
//   { icon: CheckSquare, label: "Tasks", path: "/tasks" },
//   { icon: Calendar, label: "Calendar", path: "/calendar" },
//   { icon: BarChart2, label: "Analytics", path: "/analytics" },
//   { icon: Clock, label: "Pomodoro", path: "/pomodoro" },
//   { icon: Settings, label: "Settings", path: "/settings" },
// ];

// export default function Sidebar() {
//   const [isOpen, setIsOpen] = useState(true);
//   const [isMobile, setIsMobile] = useState(false);
//   const { currentUser } = useAuth();

//   useEffect(() => {
//     const checkScreenSize = () => {
//       setIsMobile(window.innerWidth < 768);
//       if (window.innerWidth < 768) {
//         setIsOpen(false);
//       } else {
//         setIsOpen(true);
//       }
//     };

//     checkScreenSize();
//     window.addEventListener("resize", checkScreenSize);

//     return () => window.removeEventListener("resize", checkScreenSize);
//   }, []);

//   const toggleSidebar = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <>
//       <div
//         className={`fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden ${
//           isOpen && isMobile ? "block" : "hidden"
//         }`}
//         onClick={toggleSidebar}
//       ></div>
//       <aside
//         className={`fixed top-0 left-0 z-30 h-screen transition-all duration-300 ease-in-out ${
//           isOpen ? "w-64" : "w-20"
//         } ${
//           isMobile && !isOpen ? "-translate-x-full" : "translate-x-0"
//         } bg-gray-800 text-white overflow-hidden`}
//       >
//         <div className="flex justify-between items-center p-4">
//           <h1
//             className={`text-2xl font-bold transition-opacity duration-300 ${
//               isOpen ? "opacity-100" : "opacity-0"
//             }`}
//           >
//             TaskMaster
//           </h1>
//           <button
//             onClick={toggleSidebar}
//             className="text-white focus:outline-none p-1 rounded-full hover:bg-gray-700 transition-colors duration-200"
//           >
//             {isMobile ? (
//               <Menu size={24} />
//             ) : isOpen ? (
//               <ChevronLeft size={24} />
//             ) : (
//               <ChevronRight size={24} />
//             )}
//           </button>
//         </div>
//         <nav>
//           <ul className="mt-6">
//             {menuItems.map((item) => (
//               <li key={item.path} className="mb-2">
//                 <NavLink
//                   to={item.path}
//                   className={({ isActive }) =>
//                     `flex items-center p-3 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200 ${
//                       isActive ? "bg-gray-700 text-white" : ""
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
//             to="/profile"
//             className={({ isActive }) =>
//               `flex items-center text-sm hover:bg-gray-700 p-2 rounded transition-colors duration-200 ${
//                 isActive ? "bg-gray-700" : ""
//               }`
//             }
//             onClick={() => isMobile && toggleSidebar()}
//           >
//             <img
//               src={
//                 currentUser.profileImage ||
//                 "/placeholder.svg?height=32&width=32"
//               }
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
//               <p className="font-semibold">{currentUser.username}</p>
//               <p className="text-gray-400">{currentUser.email}</p>
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
  // Menu,
  // X,
} from "lucide-react";

const menuItems = [
  { icon: Home, label: "Dashboard", path: "/overview" },
  { icon: CheckSquare, label: "Tasks", path: "/tasks" },
  { icon: Calendar, label: "Calendar", path: "/calendar" },
  { icon: BarChart2, label: "Analytics", path: "/analytics" },
  { icon: Clock, label: "Pomodoro", path: "/pomodoro" },
  { icon: Settings, label: "Settings", path: "/settings" },
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
        className={`fixed top-0 z-30 h-screen transition-all duration-300 ease-in-out ${
          isOpen ? "w-64" : "w-20"
        } ${
          isMobile && !isOpen ? "-translate-x-full" : "translate-x-0"
        } bg-gray-800 text-white overflow-hidden`}
      >
        <div className="flex justify-between items-center p-4">
          {isOpen && (
            <h1 className="text-2xl font-bold transition-opacity duration-300">
              TaskMaster
            </h1>
          )}

          {/* Mobile close toggle button */}
          <button
            onClick={toggleSidebar}
            className="text-white focus:outline-none p-1 rounded-full hover:bg-gray-700 transition-colors duration-200 lg:hidden"
          >
            {isOpen && isMobile && <X size={24} />}
          </button>

          {/* Desktop toggle button */}
          <button
            onClick={toggleSidebar}
            className="text-white focus:outline-none p-1 rounded-full hover:bg-gray-700 transition-colors duration-200 hidden lg:block"
          >
            {isOpen && !isMobile ? (
              <ChevronLeft size={24} />
            ) : (
              <ChevronRight size={24} />
            )}
          </button>
        </div>
        <nav>
          <ul className="mt-6">
            {menuItems.map((item) => (
              <li key={item.path} className="mb-2">
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center p-3 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200 ${
                      isActive ? "bg-gray-700 text-white" : ""
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
            to="/profile"
            className={({ isActive }) =>
              `flex items-center text-sm hover:bg-gray-700 p-2 rounded transition-colors duration-200 ${
                isActive ? "bg-gray-700" : ""
              }`
            }
            onClick={() => isMobile && toggleSidebar()}
          >
            <img
              src={
                currentUser.profileImage ||
                "/placeholder.svg?height=32&width=32"
              }
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
              <p className="font-semibold">{currentUser.username}</p>
              <p className="text-gray-400">{currentUser.email}</p>
            </div>
          </NavLink>
        </div>
      </aside>
    </>
  );
}
