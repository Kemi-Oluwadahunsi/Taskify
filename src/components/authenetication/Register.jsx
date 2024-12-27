// 3.
// import { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { motion } from "framer-motion";
// import { useAuth } from "../../contexts/AuthContext";
// import { Eye, EyeOff } from "lucide-react";

// export default function Register() {
//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     password: "",
//   });
//   const [formErrors, setFormErrors] = useState({});
//   const [showPassword, setShowPassword] = useState(false);
//   const { signup } = useAuth();
//   const navigate = useNavigate();

//   const validateForm = () => {
//     const errors = {};

//     // Username validation
//     if (!formData.username.match(/^[a-zA-Z0-9]{4,}$/)) {
//       errors.username =
//         "Username must be at least 4 characters and can only contain letters and numbers.";
//     }

//     // Email validation
//     const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//     if (!formData.email.match(emailRegex)) {
//       errors.email = "Please enter a valid email address.";
//     }

//     // Password validation
//     const passwordRegex =
//       /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
//     if (!formData.password.match(passwordRegex)) {
//       errors.password =
//         "Password must be at least 8 characters and include at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.";
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
//         await signup(formData.email, formData.password, formData.username);
//         navigate("/");
//       } catch (error) {
//         console.log("Error registering user:", error);
//         setFormErrors({
//           ...formErrors,
//           submit: "Registration failed. Please try again.",
//         });
//       }
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
//           src="/images/authbg2.webp"
//           alt="Task management illustration"
//         />
//       </div>

//       <div className="block lg:hidden">
//         <div>
//           <img
//             src="/images/logo.png"
//             alt="logo"
//             className=" w-24 sm:w-32 absolute z-10 top-5 left-[5%]"
//           />
//         </div>
//       </div>

//       <div className=" flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 xl:px-16 basis-[40%]">
//         <motion.div
//           initial={{ opacity: 0, y: -50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="mx-auto w-full max-w-[26rem] authbgmobile lg:authbg px-4 py-8 rounded-xl bg-gradient-to-b from-lightnext to-lighter shadow-[0px_12px_40px_rgba(149,1,1,0.6)] z-10"
//         >
//           <div>
//             <h2 className="text-2xl lg:text-4xl font-extrabold text-center text-primary">
//               Create your account
//             </h2>
//             <p className="mt-2 text-gray-700 text-center">
//               Or{" "}
//               <Link
//                 to="/login"
//                 className="font-bold text-primary hover:text-secondary underline decoration-inherit underline-offset-4"
//               >
//                 sign in to your account
//               </Link>
//             </p>
//           </div>

//           <div className="mt-8">
//             <form onSubmit={handleSubmit} className="space-y-6">
//               {formErrors.submit && (
//                 <p className="text-red-500 text-sm">{formErrors.submit}</p>
//               )}
//               <div>
//                 <label
//                   htmlFor="username"
//                   className="block font-medium text-gray-700"
//                 >
//                   Username
//                 </label>
//                 <div className="mt-1">
//                   <input
//                     id="username"
//                     name="username"
//                     type="text"
//                     placeholder="e.g. Joel Ali"
//                     required
//                     className="appearance-none bg-[#fff0f0] block w-full px-3 py-2 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:ring-2 focus:border-primary sm:text-sm"
//                     value={formData.username}
//                     onChange={handleChange}
//                   />
//                 </div>
//                 {formErrors.username && (
//                   <p className="mt-2 text-sm text-red-600">
//                     {formErrors.username}
//                   </p>
//                 )}
//               </div>

//               <div>
//                 <label
//                   htmlFor="email"
//                   className="block font-medium text-gray-700"
//                 >
//                   Email address
//                 </label>
//                 <div className="mt-1">
//                   <input
//                     id="email"
//                     name="email"
//                     type="email"
//                     placeholder="joelali@xmail.com"
//                     autoComplete="email"
//                     required
//                     className="appearance-none bg-[#fff0f0] block w-full px-3 py-2 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:ring-2 focus:border-primary sm:text-sm"
//                     value={formData.email}
//                     onChange={handleChange}
//                   />
//                 </div>
//                 {formErrors.email && (
//                   <p className="mt-2 text-sm text-red-600">
//                     {formErrors.email}
//                   </p>
//                 )}
//               </div>

//               <div>
//                 <label
//                   htmlFor="password"
//                   className="block font-medium text-gray-700"
//                 >
//                   Password
//                 </label>
//                 <div className="mt-1 relative">
//                   <input
//                     id="password"
//                     name="password"
//                     type={showPassword ? "text" : "password"}
//                     placeholder="xxxxxxxx"
//                     autoComplete="new-password"
//                     required
//                     className="appearance-none bg-[#fff0f0] block w-full px-3 py-2 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:ring-2  focus:border-primary sm:text-sm"
//                     value={formData.password}
//                     onChange={handleChange}
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
//                 {formErrors.password && (
//                   <p className="mt-2 text-sm text-red-600">
//                     {formErrors.password}
//                   </p>
//                 )}
//               </div>

//               <div>
//                 <motion.button
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.5 }}
//                   type="submit"
//                   className="w-full flex justify-center py-2 px-4 border border-transparent transition duration-300 rounded-md shadow-xl font-medium text-white bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
//                 >
//                   Register
//                 </motion.button>
//               </div>
//             </form>
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../../contexts/AuthContext";
import { Eye, EyeOff } from "lucide-react";

export default function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);
  const { initiateSignup } = useAuth();

  const validateForm = () => {
    const errors = {};

    if (!formData.username.match(/^[a-zA-Z0-9]{4,}$/)) {
      errors.username =
        "Username must be at least 4 characters and can only contain letters and numbers.";
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!formData.email.match(emailRegex)) {
      errors.email = "Please enter a valid email address.";
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (!formData.password.match(passwordRegex)) {
      errors.password =
        "Password must be at least 8 characters and include at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.";
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
      setIsSubmitting(true);
      try {
        await initiateSignup(
          formData.username,
          formData.email,
          formData.password
        );
        setVerificationSent(true);
      } catch (error) {
        console.error("Error initiating signup:", error);
        setFormErrors({
          ...formErrors,
          submit:
            error.message || "Signup initiation failed. Please try again.",
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  if (verificationSent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Verify Your Email
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              We&apos;ve sent a verification email to{" "}
              <span className="text-secondary font-medium">
                {formData.email}
              </span>
              . Please check your inbox and click the verification link to
              complete your registration.
            </p>
          </div>
          <div className="mt-5">
            <Link
              to="/login"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-xl font-bold text-lg text-white bg-gradient-to-r from-purple-500 to-pink-500  hover:from-purple-600 hover:to-pink-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Go to Login
            </Link>
          </div>
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
            src="/images/register.png"
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
            className="mx-auto w-full max-w-[26rem] xl:w-[28rem] authbgmobile lg:authbg px-4 py-8 rounded-xl bg-gradient-to-b from-purple-100 to-purple-300 shadow-[0px_12px_40px_rgba(149,1,1,0.6)] z-10"
          >
            <div>
              <h2 className="text-2xl lg:text-4xl font-extrabold text-center text-primary">
                Create your account
              </h2>
              <p className="mt-2 text-gray-700 text-center">
                Or{" "}
                <Link
                  to="/login"
                  className="font-bold text-primary hover:text-purple-950 underline decoration-inherit underline-offset-4"
                >
                  sign in to your account
                </Link>
              </p>
            </div>
            <div className="mt-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {formErrors.submit && (
                  <p className="text-red-500 text-sm">{formErrors.submit}</p>
                )}
                <div>
                  <label
                    htmlFor="username"
                    className="block font-medium text-gray-700"
                  >
                    Username
                  </label>
                  <div className="mt-1">
                    <input
                      id="username"
                      name="username"
                      type="text"
                      placeholder="e.g. Joel Ali"
                      required
                      className="appearance-none bg-[#fff0f0] block w-full px-3 py-2 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:ring-2 focus:border-primary sm:text-sm"
                      value={formData.username}
                      onChange={handleChange}
                    />
                  </div>
                  {formErrors.username && (
                    <p className="mt-2 text-sm text-red-600">
                      {formErrors.username}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block font-medium text-gray-700"
                  >
                    Email address
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="joelali@xmail.com"
                      autoComplete="email"
                      required
                      className="appearance-none bg-[#fff0f0] block w-full px-3 py-2 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:ring-2 focus:border-primary sm:text-sm"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
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
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="xxxxxxxx"
                      autoComplete="new-password"
                      required
                      className="appearance-none bg-[#fff0f0] block w-full px-3 py-2 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:ring-2  focus:border-primary sm:text-sm"
                      value={formData.password}
                      onChange={handleChange}
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
                <div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.5 }}
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-xl font-bold text-lg text-white bg-gradient-to-r from-purple-500 to-pink-500  hover:from-purple-600 hover:to-pink-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
                  >
                    {isSubmitting ? "Initiating registration..." : "Register"}
                  </motion.button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
