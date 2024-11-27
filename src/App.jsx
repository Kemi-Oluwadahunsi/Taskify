import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
// import { useAuth } from "./contexts/AuthContext";
import Dashboard from "./components/Dashboard";
import Login from "./components/authenetication/Login";
import Register from "./components/authenetication/Register";
import { Toaster } from "sonner";
import EmailVerification from "./components/authenetication/EmailVerification";
import ForgotPassword from "./components/authenetication/ForgotPassword";
import ResetPassword from "./components/authenetication/ResetPassword";
import HomePage from "./components/landing-page/HomePage";

// function ProtectedRoute({ children }) {
//   const { currentUser } = useAuth();

//   if (!currentUser) {
//     return <Navigate to="/login" replace />;
//   }

//   return children;
// }

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 max-w-[1600px] mx-auto">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify-email" element={<EmailVerification />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route
            path="/dashboard/*"
            element={
              // <ProtectedRoute>
                <Dashboard />
              // </ProtectedRoute>
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