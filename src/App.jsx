// import {
//   BrowserRouter as Router,
//   Route,
//   Routes,
//   // Navigate,
// } from "react-router-dom";
// import Register from "./components/authenetication/Register";
// import Login from "./components/authenetication/Login";
// import Dashboard from "./components/Dashboard";
// import UserProfile from "./components/UserProfile";
// // import { useAuth } from "./contexts/AuthContext";

// // const PrivateRoute = ({ children }) => {
// //   const { token } = useAuth();
// //   return token ? children : <Navigate to="/login" />;
// // };

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/register" element={<Register />} />
//         <Route path="/login" element={<Login />} />
//         <Route
//           path="/"
//           element={
//             // <PrivateRoute>
//               <Dashboard />
//             // </PrivateRoute>
//           }
//         />
//         <Route
//           path="/profile"
//           element={
//             // <PrivateRoute>
//               <UserProfile />
//             // </PrivateRoute>
//           }
//         />
//       </Routes>
//     </Router>
//   );
// }

// export default App;


// import { useEffect } from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import { useAppContext } from "./context/AppContext";
// import Dashboard from "./components/Dashboard";
// import Login from "./components/Login";
// import Register from "./components/Register";
// import { Toaster } from "@/components/ui/toaster";
// import { useToast } from "@/components/ui/use-toast";

// function AppContent() {
//   const { tasks } = useAppContext();
//   const { toast } = useToast();

//   useEffect(() => {
//     const checkDueTasks = () => {
//       const now = new Date();
//       const soonDueTasks = tasks.filter((task) => {
//         const dueDate = new Date(task.dueDate);
//         const timeDiff = dueDate.getTime() - now.getTime();
//         const daysDiff = timeDiff / (1000 * 3600 * 24);
//         return daysDiff <= 1 && daysDiff > 0;
//       });

//       soonDueTasks.forEach((task) => {
//         toast({
//           title: "Task Due Soon",
//           description: `Task "${task.title}" is due soon!`,
//         });
//       });
//     };

//     const intervalId = setInterval(checkDueTasks, 60000); // Check every minute

//     return () => clearInterval(intervalId);
//   }, [tasks, toast]);

//   return (
//     <Router>
//       <Routes>
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/" element={<Dashboard />} />
//       </Routes>
//       <Toaster />
//     </Router>
//   );
// }

// function App() {
//   return (
    
//       <AppContent />

//   );
// }

// export default App;


import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import Dashboard from "./components/Dashboard";
import Login from "./components/authenetication/Login";
import Register from "./components/authenetication/Register";
import { Toaster } from "sonner";
import EmailVerification from "./components/authenetication/EmailVerification";
import ForgotPassword from "./components/authenetication/ForgotPassword";
import ResetPassword from "./components/authenetication/ResetPassword";
import HomePage from "./components/landing-page/HomePage";

function ProtectedRoute({ children }) {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 max-w-[1600px] mx-auto">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify-email/:token" element={<EmailVerification />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          {/* <Route path="/reset-password/:token" element={<ResetPassword />} /> */}
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route
            path="/dashboard/*"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
      <Toaster position="top-right" />
    </Router>
  );
}

export default App;