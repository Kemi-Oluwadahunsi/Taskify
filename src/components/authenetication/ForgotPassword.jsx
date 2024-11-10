import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const { forgotPassword } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError("");
      setMessage("");
      const response = await forgotPassword(email);
      setMessage(
        response ||
          "If an account with that email exists, a password reset link has been sent."
      );
    } catch (error) {
      setError("Failed to initiate password reset. Please try again.", error);
    }
  };

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
            src="/images/bigger-forgot.png"
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
              Forgot Password
            </h2>
            <div className="mt-8">
              {error && (
                <p className="text-red-500 text-sm text-center mb-4">{error}</p>
              )}
              {message && (
                <p className="text-green-500 text-sm text-center mb-4">
                  {message}
                </p>
              )}
              <form onSubmit={handleSubmit} className="space-y-6">
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="joelali@xmail.com"
                    className="mt-1 appearance-none bg-[#fff0f0] block w-full px-3 py-2 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm"
                    required
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent transition duration-300 rounded-md shadow-xl font-medium text-white bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  Send Reset Link
                </motion.button>
              </form>
            </div>
            <div className="mt-4 text-center">
              <Link
                to="/login"
                className="text-primary font-bold hover:text-secondary underline decoration-inherit underline-offset-4"
              >
                Back to Login
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
