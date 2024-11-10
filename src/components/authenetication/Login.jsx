// import { useState } from "react";
// import { useAuth } from "../../contexts/AuthContext";
// import { useNavigate, Link } from "react-router-dom";
// import { motion } from "framer-motion";
// import { Eye, EyeOff } from "lucide-react";

// export default function Login() {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });
//   const [formErrors, setFormErrors] = useState({});
//   const [showPassword, setShowPassword] = useState(false);
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const validateForm = () => {
//     const errors = {};

//     // Email validation
//     const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//     if (!formData.email.match(emailRegex)) {
//       errors.email = "Please enter a valid email address.";
//     }

//     // Password validation
//     if (formData.password.length < 8) {
//       errors.password = "Password must be at least 8 characters long.";
//     }

//     setFormErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (validateForm()) {
//       try {
//         await login(formData.email, formData.password);
//         navigate("/dashboard");
//       } catch (error) {
//         console.log("Error logging in:", error);
//         setFormErrors({
//           ...formErrors,
//           submit:
//             error.message || "Invalid email or password. Please try again.",
//         });
//       }
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center lg:bg-purple-200 w-full">
//       <div className="flex authbackgroundmobile h-screen lg:h-[40rem] w-full xl:w-[80%] bg-purple-300 border border-purple-400 lg:rounded-3xl">
//         <div className="hidden lg:block relative flex-1 basis-[50%]">
//           <div>
//             <img
//               src="/images/logo.png"
//               alt="logo"
//               className="w-32 absolute z-10 top-10 left-[5%]"
//             />
//           </div>
//           <img
//             className="absolute inset-0 h-full object-cover w-full rounded-tl-2xl rounded-bl-2xl"
//             src="/images/login2.png"
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
//               Login
//             </h2>
//             <div className="mt-8">
//               <form onSubmit={handleSubmit} className="space-y-6">
//                 {formErrors.submit && (
//                   <p className="text-red-500 text-sm text-center">
//                     {formErrors.submit}
//                   </p>
//                 )}
//                 <div>
//                   <label
//                     htmlFor="email"
//                     className="block font-medium text-gray-700"
//                   >
//                     Email
//                   </label>
//                   <input
//                     type="email"
//                     id="email"
//                     name="email"
//                     placeholder="joelali@xmail.com"
//                     value={formData.email}
//                     onChange={handleChange}
//                     className="mt-1 appearance-none bg-[#fff0f0] block w-full px-3 py-2 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm"
//                     required
//                   />
//                   {formErrors.email && (
//                     <p className="mt-2 text-sm text-red-600">
//                       {formErrors.email}
//                     </p>
//                   )}
//                 </div>
//                 <div>
//                   <label
//                     htmlFor="password"
//                     className="block font-medium text-gray-700"
//                   >
//                     Password
//                   </label>
//                   <div className="mt-1 relative">
//                     <input
//                       type={showPassword ? "text" : "password"}
//                       id="password"
//                       name="password"
//                       placeholder="xxxxxxxx"
//                       value={formData.password}
//                       onChange={handleChange}
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
//                   {formErrors.password && (
//                     <p className="mt-2 text-sm text-red-600">
//                       {formErrors.password}
//                     </p>
//                   )}
//                 </div>
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center">
//                     <input
//                       id="remember-me"
//                       name="remember-me"
//                       type="checkbox"
//                       className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
//                     />
//                     <label
//                       htmlFor="remember-me"
//                       className="ml-2 block text-sm text-gray-900"
//                     >
//                       Remember me
//                     </label>
//                   </div>
//                   <div className="text-sm">
//                     <Link
//                       to="/forgot-password"
//                       className="font-medium text-primary hover:text-secondary"
//                     >
//                       Forgot your password?
//                     </Link>
//                   </div>
//                 </div>
//                 <motion.button
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.5 }}
//                   type="submit"
//                   className="w-full flex justify-center py-2 px-4 border border-transparent transition duration-300 rounded-md shadow-xl font-medium text-white bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
//                 >
//                   Login
//                 </motion.button>
//               </form>
//             </div>
//             <p className="mt-4 text-center text-gray-100 lg:text-gray-600">
//               Don&apos;t have an account?{" "}
//               <Link
//                 to="/register"
//                 className="text-primary font-bold hover:text-secondary underline decoration-inherit underline-offset-4"
//               >
//                 Register here
//               </Link>
//             </p>
//           </motion.div>
//         </div>
//       </div>
//     </div>
//   );
// }


import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";

export default function Login() {
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [verificationSuccess, setVerificationSuccess] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const emailParam = searchParams.get("email");
    const verified = searchParams.get("verified");
    if (emailParam) {
      setFormData((prevData) => ({ ...prevData, email: emailParam }));
    }
    if (verified === "true") {
      setVerificationSuccess(true);
    }
  }, [searchParams]);

  const validateForm = () => {
    const errors = {};

    // Email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!formData.email.match(emailRegex)) {
      errors.email = "Please enter a valid email address.";
    }

    // Password validation
    if (formData.password.length < 8) {
      errors.password = "Password must be at least 8 characters long.";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await login(formData.email, formData.password);
        navigate("/dashboard/overview");
      } catch (error) {
        console.log("Error logging in:", error);
        setFormErrors({
          ...formErrors,
          submit:
            error.message || "Invalid email or password. Please try again.",
        });
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center lg:bg-purple-200 w-full">
      <div className="flex authbackgroundmobile h-screen lg:h-[40rem] w-full xl:w-[80%] bg-purple-300 border border-purple-400 lg:rounded-3xl">
        <div className="hidden lg:block relative flex-1 basis-[50%]">
          <div>
            <img
              src="/images/logo.png"
              alt="logo"
              className="w-32 absolute z-10 top-10 left-[5%]"
            />
          </div>
          <img
            className="absolute inset-0 h-full object-cover w-full rounded-tl-2xl rounded-bl-2xl"
            src="/images/login2.png"
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
              Login
            </h2>
            {verificationSuccess && (
              <p className="mt-2 text-center text-sm text-green-600">
                Your email has been successfully verified. You can now log in.
              </p>
            )}
            <div className="mt-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {formErrors.submit && (
                  <p className="text-red-500 text-sm text-center">
                    {formErrors.submit}
                  </p>
                )}
                <div>
                  <label
                    htmlFor="email"
                    className="block font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="joelali@xmail.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 appearance-none bg-[#fff0f0] block w-full px-3 py-2 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm"
                    required
                  />
                  {formErrors.email && (
                    <p className="mt-2 text-sm text-red-600">
                      {formErrors.email}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <div className="mt-1 relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      placeholder="xxxxxxxx"
                      value={formData.password}
                      onChange={handleChange}
                      className="appearance-none bg-[#fff0f0] block w-full px-3 py-2 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm"
                      required
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
                  {formErrors.password && (
                    <p className="mt-2 text-sm text-red-600">
                      {formErrors.password}
                    </p>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                    />
                    <label
                      htmlFor="remember-me"
                      className="ml-2 block text-sm text-gray-900"
                    >
                      Remember me
                    </label>
                  </div>
                  <div className="text-sm">
                    <Link
                      to="/forgot-password"
                      className="font-medium text-primary hover:text-secondary"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.5 }}
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent transition duration-300 rounded-md shadow-xl font-medium text-white bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  Login
                </motion.button>
              </form>
            </div>
            <p className="mt-4 text-center text-gray-100 lg:text-gray-600">
              Don&apos;t have an account?{" "}
              <Link
                to="/register"
                className="text-primary font-bold hover:text-secondary underline decoration-inherit underline-offset-4"
              >
                Register here
              </Link>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}