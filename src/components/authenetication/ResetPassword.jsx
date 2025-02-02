// import { useState } from "react";
// import { useAuth } from "../../contexts/AuthContext";
// import { useNavigate, useLocation } from "react-router-dom";
// import { motion } from "framer-motion";
// import { Eye, EyeOff } from "lucide-react";

// export default function ResetPassword() {
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [error, setError] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const { resetPassword } = useAuth();
//   const navigate = useNavigate();
//   const location = useLocation();

//   // Get the token from the URL
//   const token = new URLSearchParams(location.search).get("token");

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (password !== confirmPassword) {
//       return setError("Passwords do not match");
//     }

//     try {
//       await resetPassword(token, password);
//       navigate("/login", {
//         state: { message: "Password has been reset successfully" },
//       });
//     } catch (error) {
//       setError("Failed to reset password:", error);
//     }
//   };

//   return (
//     <div className="min-h-screen flex authbackgroundmobile lg:bg-formbg/90 w-full">
//       <div className="hidden lg:block relative flex-1 basis-[60%]">
//         <div>
//           <img
//             src="/images/logo.png"
//             alt="logo"
//             className="w-32 absolute z-10 top-10 left-[5%]"
//           />
//         </div>
//         <img
//           className="absolute inset-0 h-full object-cover"
//           src="/images/authbg.webp"
//           alt="Task management illustration"
//         />
//       </div>

//       <div className="block lg:hidden">
//         <div>
//           <img
//             src="/images/logo.png"
//             alt="logo"
//             className="w-24 sm:w-32 absolute z-10 top-5 left-[5%]"
//           />
//         </div>
//       </div>

//       <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 xl:px-16 basis-[40%]">
//         <motion.div
//           initial={{ opacity: 0, y: -50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="mx-auto w-full max-w-[26rem] authbgmobile lg:authbg px-4 py-8 rounded-xl bg-gradient-to-b from-lightnext to-lighter shadow-[0px_12px_40px_rgba(149,1,1,0.6)] z-10"
//         >
//           <h2 className="text-2xl lg:text-4xl font-extrabold text-center text-primary">
//             Reset Password
//           </h2>

//           <div className="mt-8">
//             {error && (
//               <p className="text-red-500 text-sm text-center mb-4">{error}</p>
//             )}
//             <form onSubmit={handleSubmit} className="space-y-6">
//               <div>
//                 <label
//                   htmlFor="password"
//                   className="block font-medium text-gray-700"
//                 >
//                   New Password
//                 </label>
//                 <div className="mt-1 relative">
//                   <input
//                     type={showPassword ? "text" : "password"}
//                     id="password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     placeholder="xxxxxxxx"
//                     className="appearance-none bg-[#fff0f0] block w-full px-3 py-2 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm"
//                     required
//                   />
//                   <button
//                     type="button"
//                     className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
//                     onClick={() => setShowPassword(!showPassword)}
//                   >
//                     {showPassword ? (
//                       <EyeOff className="h-5 w-5 text-primary" />
//                     ) : (
//                       <Eye className="h-5 w-5 text-primary" />
//                     )}
//                   </button>
//                 </div>
//               </div>
//               <div>
//                 <label
//                   htmlFor="confirmPassword"
//                   className="block font-medium text-gray-700"
//                 >
//                   Confirm New Password
//                 </label>
//                 <div className="mt-1 relative">
//                   <input
//                     type={showConfirmPassword ? "text" : "password"}
//                     id="confirmPassword"
//                     value={confirmPassword}
//                     onChange={(e) => setConfirmPassword(e.target.value)}
//                     placeholder="xxxxxxxx"
//                     className="appearance-none bg-[#fff0f0] block w-full px-3 py-2 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm"
//                     required
//                   />
//                   <button
//                     type="button"
//                     className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
//                     onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                   >
//                     {showConfirmPassword ? (
//                       <EyeOff className="h-5 w-5 text-primary" />
//                     ) : (
//                       <Eye className="h-5 w-5 text-primary" />
//                     )}
//                   </button>
//                 </div>
//               </div>
//               <motion.button
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.5 }}
//                 type="submit"
//                 className="w-full flex justify-center py-2 px-4 border border-transparent transition duration-300 rounded-md shadow-xl font-medium text-white bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
//               >
//                 Reset Password
//               </motion.button>
//             </form>
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// }

// import { useState, useEffect } from "react";
// import { useAuth } from "../../contexts/AuthContext";
// import { useNavigate, useLocation } from "react-router-dom";
// import { motion } from "framer-motion";
// import { Eye, EyeOff } from "lucide-react";

// export default function ResetPassword() {
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [error, setError] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [token, setToken] = useState(null);
//   const { resetPassword } = useAuth();
//   const navigate = useNavigate();
//   const location = useLocation();

//   useEffect(() => {
//     const params = new URLSearchParams(location.search);
//     const tokenFromUrl = params.get("token");
//     if (tokenFromUrl) {
//       setToken(tokenFromUrl);
//     } else {
//       setError(
//         "Invalid or missing reset token. Please request a new password reset."
//       );
//     }
//   }, [location]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (password !== confirmPassword) {
//       return setError("Passwords do not match");
//     }

//     if (!token) {
//       return setError(
//         "Invalid or missing reset token. Please request a new password reset."
//       );
//     }

//     try {
//       const response = await resetPassword(token, password);
//       navigate("/login", {
//         state: {
//           message: response,
//         },
//       });
//     } catch (error) {
//       setError(
//         error.message || "An error occurred while resetting the password."
//       );
//     }
//   };

//   if (!token) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <h2 className="text-2xl font-bold mb-4">Invalid Reset Link</h2>
//           <p>{error}</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center lg:bg-purple-200 w-full">
//       <div className="flex authbackgroundmobile2 h-screen lg:h-[40rem] w-full xl:w-[80%] bg-purple-300 border border-purple-400 lg:rounded-3xl">
//         <div className="hidden lg:block relative flex-1 basis-[60%]">
//           <div>
//             <img
//               src="/images/logo.png"
//               alt="logo"
//               className="w-32 absolute z-10 top-10 left-[5%]"
//             />
//           </div>
//           <img
//             className="absolute inset-0 h-full object-cover rounded-tl-2xl rounded-bl-2xl"
//             src="/images/reset.jpg"
//             alt="Task management illustration"
//           />
//         </div>
//         <div className="block lg:hidden">
//           <div>
//             <img
//               src="/images/logo.png"
//               alt="logo"
//               className="w-24 sm:w-32 absolute z-10 top-5 left-[5%]"
//             />
//           </div>
//         </div>
//         <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 xl:px-16 basis-[40%]">
//           <motion.div
//             initial={{ opacity: 0, y: -50 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             className="mx-auto w-full max-w-[26rem] authbgmobile lg:authbg px-4 py-8 rounded-xl bg-gradient-to-b from-purple-100 to-purple-300 shadow-[0px_12px_40px_rgba(149,1,1,0.6)] z-10"
//           >
//             <h2 className="text-2xl lg:text-4xl font-extrabold text-center text-primary">
//               Reset Password
//             </h2>
//             <div className="mt-8">
//               {error && (
//                 <p className="text-red-500 text-sm text-center mb-4">{error}</p>
//               )}
//               <form onSubmit={handleSubmit} className="space-y-6">
//                 <div>
//                   <label
//                     htmlFor="password"
//                     className="block font-medium text-gray-700"
//                   >
//                     New Password
//                   </label>
//                   <div className="mt-1 relative">
//                     <input
//                       type={showPassword ? "text" : "password"}
//                       id="password"
//                       value={password}
//                       onChange={(e) => setPassword(e.target.value)}
//                       placeholder="xxxxxxxx"
//                       className="appearance-none bg-[#fff0f0] block w-full px-3 py-2 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm"
//                       required
//                     />
//                     <button
//                       type="button"
//                       className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
//                       onClick={() => setShowPassword(!showPassword)}
//                     >
//                       {showPassword ? (
//                         <EyeOff className="h-5 w-5 text-primary" />
//                       ) : (
//                         <Eye className="h-5 w-5 text-primary" />
//                       )}
//                     </button>
//                   </div>
//                 </div>
//                 <div>
//                   <label
//                     htmlFor="confirmPassword"
//                     className="block font-medium text-gray-700"
//                   >
//                     Confirm New Password
//                   </label>
//                   <div className="mt-1 relative">
//                     <input
//                       type={showConfirmPassword ? "text" : "password"}
//                       id="confirmPassword"
//                       value={confirmPassword}
//                       onChange={(e) => setConfirmPassword(e.target.value)}
//                       placeholder="xxxxxxxx"
//                       className="appearance-none bg-[#fff0f0] block w-full px-3 py-2 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm"
//                       required
//                     />
//                     <button
//                       type="button"
//                       className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
//                       onClick={() =>
//                         setShowConfirmPassword(!showConfirmPassword)
//                       }
//                     >
//                       {showConfirmPassword ? (
//                         <EyeOff className="h-5 w-5 text-primary" />
//                       ) : (
//                         <Eye className="h-5 w-5 text-primary" />
//                       )}
//                     </button>
//                   </div>
//                 </div>
//                 <motion.button
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.95 }}
//                   type="submit"
//                   className="w-full flex justify-center py-2 px-4 border border-transparent transition duration-300 rounded-md shadow-xl font-medium text-white bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
//                 >
//                   Reset Password
//                 </motion.button>
//               </form>
//             </div>
//           </motion.div>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [token, setToken] = useState(null);
  const { resetPassword } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tokenFromUrl = params.get("token");
    console.log("Token from URL:", tokenFromUrl);
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
    } else {
      setError(
        "Invalid or missing reset token. Please request a new password reset."
      );
    }
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    if (!token) {
      setError(
        "Invalid or missing reset token. Please request a new password reset."
      );
      return;
    }

    try {
      console.log(`Sending reset request with token: ${token}`);
      const response = await resetPassword(token, password);
      setSuccess(response);
      toast.success(
        "Password reset successful. You can now log in with your new password."
      );
      setTimeout(() => {
        navigate("/login", {
          state: {
            message:
              "Password reset successful. You can now log in with your new password.",
          },
        });
      }, 3000);
    } catch (error) {
      toast.error("Error resetting password, please try again!")
      setError(
        error.message || "An error occurred while resetting the password."
      );
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-purple-200">
        <div className="text-center bg-white p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-primary">
            Invalid Reset Link
          </h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Link
            to="/forgot-password"
            className="text-primary hover:text-secondary underline"
          >
            Request a new password reset
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center lg:bg-purple-200 w-full">
      <div className="flex authbackgroundmobile2 h-screen lg:h-[40rem] w-full xl:w-[80%] bg-purple-300 border border-purple-400 lg:rounded-3xl">
        <div className="hidden lg:block relative flex-1 basis-[60%]">
          <div>
            <img
              src="/images/logo.png"
              alt="logo"
              className="w-32 absolute z-10 top-10 left-[5%]"
            />
          </div>
          <img
            className="absolute inset-0 h-full object-cover rounded-tl-2xl rounded-bl-2xl"
            src="/images/reset.jpg"
            alt="Task management illustration"
          />
        </div>
        <div className="block lg:hidden">
          <div>
            <img
              src="/images/logo.png"
              alt="logo"
              className="w-24 sm:w-32 absolute z-10 top-5 left-[5%]"
            />
          </div>
        </div>
        <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 xl:px-16 basis-[40%]">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto w-full max-w-[26rem] authbgmobile lg:authbg px-4 py-8 rounded-xl bg-gradient-to-b from-purple-100 to-purple-300 shadow-[0px_12px_40px_rgba(149,1,1,0.6)] z-10"
          >
            <h2 className="text-2xl lg:text-4xl font-extrabold text-center text-primary">
              Reset Password
            </h2>
            <div className="mt-8">
              {error && (
                <p className="text-red-500 text-sm text-center mb-4">{error}</p>
              )}
              {success && (
                <p className="text-green-500 text-sm text-center mb-4">
                  {success}
                </p>
              )}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="password"
                    className="block font-medium text-gray-700"
                  >
                    New Password
                  </label>
                  <div className="mt-1 relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="xxxxxxxx"
                      className="appearance-none bg-[#fff0f0] block w-full px-3 py-2 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm"
                      required
                      minLength={8}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-primary" />
                      ) : (
                        <Eye className="h-5 w-5 text-primary" />
                      )}
                    </button>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block font-medium text-gray-700"
                  >
                    Confirm New Password
                  </label>
                  <div className="mt-1 relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="xxxxxxxx"
                      className="appearance-none bg-[#fff0f0] block w-full px-3 py-2 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm"
                      required
                      minLength={8}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-5 w-5 text-primary" />
                      ) : (
                        <Eye className="h-5 w-5 text-primary" />
                      )}
                    </button>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-xl font-bold text-lg text-white bg-gradient-to-r from-purple-500 to-pink-500  hover:from-purple-600 hover:to-pink-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
                >
                  Reset Password
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}