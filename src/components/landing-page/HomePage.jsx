import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ChevronRight,
  ChevronLeft,
  Calendar,
  Clock,
  Users,
  Target,
} from "lucide-react";
import Features from "./Features";
import Benefits from "./Benefits";
import Faq from "./Faq";
import Footer from "./Footer";
import Header from "./Header";

const carouselItems = [
  {
    title: "Achieve More, Stress Less",
    description:
      "TaskMaster is your ultimate free personal task manager, designed to simplify your life and boost your productivity.",
    icon: <Target className="w-16 h-16 text-pink-400" />,
  },
  {
    title: "Collaborate Seamlessly",
    description:
      "Work together with your team, assign tasks, and track progress in real-time.",
    icon: <Users className="w-16 h-16 text-indigo-400" />,
  },
  {
    title: "Never Miss a Deadline",
    description:
      "Set reminders, track due dates, and stay on top of your schedule effortlessly.",
    icon: <Calendar className="w-16 h-16 text-green-400" />,
  },
  {
    title: "Boost Your Productivity",
    description:
      "Optimize your workflow, track your time, and accomplish more in less time.",
    icon: <Clock className="w-16 h-16 text-yellow-400" />,
  },
];

export default function LandingPage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % carouselItems.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 text-white">
      <div
        className="max-w-7xl mx-auto relative"
        style={{
          backgroundImage: "url('/placeholder.svg?height=1080&width=1920')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10">
          <Header />
          <main className="container mx-auto px-4 py-16">
            {/* Hero Section with Carousel */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="text-center min-h-[70vh] mb-16 relative"
            >
              <div className="relative h-[400px] overflow-hidden rounded-xl">
                <AnimatePresence initial={false}>
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 flex flex-col items-center justify-center p-8"
                  >
                    {carouselItems[currentSlide].icon}
                    <h2 className="text-5xl font-bold mb-4 mt-4">
                      {carouselItems[currentSlide].title}
                    </h2>
                    <p className="text-xl mb-8">
                      {carouselItems[currentSlide].description}
                    </p>
                    <Link
                      to="/register"
                      className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300 inline-flex items-center"
                    >
                      Get Started for Free <ChevronRight className="ml-2" />
                    </Link>
                  </motion.div>
                </AnimatePresence>
              </div>
              <button
                onClick={() =>
                  setCurrentSlide(
                    (prevSlide) =>
                      (prevSlide - 1 + carouselItems.length) %
                      carouselItems.length
                  )
                }
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-full"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={() =>
                  setCurrentSlide(
                    (prevSlide) => (prevSlide + 1) % carouselItems.length
                  )
                }
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-full"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {carouselItems.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full ${
                      currentSlide === index ? "bg-white" : "bg-gray-400"
                    }`}
                  />
                ))}
              </div>
            </motion.div>

            {/* Key Features Overview */}
            <Features />

            {/* Benefits Section */}
            <Benefits />

            {/* Mid-page CTA */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="text-center mb-16"
            >
              <motion.h3
                variants={itemVariants}
                className="text-3xl font-bold mb-4"
              >
                Ready to Boost Your Productivity?
              </motion.h3>
              <motion.div variants={itemVariants}>
                <Link
                  to="/register"
                  className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300 inline-flex items-center transform hover:scale-110"
                >
                  Get Started Now - It&apos;s Free!{" "}
                  <ChevronRight className="ml-2" />
                </Link>
              </motion.div>
            </motion.div>

            {/* FAQ Section */}
            <Faq />

            {/* Sign-Up Prompt  */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="mb-16 text-center"
            >
              <motion.h3
                variants={itemVariants}
                className="text-3xl font-bold mb-4"
              >
                Join TaskMaster Today
              </motion.h3>
              <motion.p variants={itemVariants} className="text-xl mb-8">
                Start organizing your life and boosting your productivity now -
                completely free!
              </motion.p>
              <motion.form
                variants={itemVariants}
                className="max-w-md mx-auto mb-8"
              >
                <div className="flex">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-grow px-4 py-2 rounded-l-full focus:outline-none focus:ring-2 focus:ring-pink-500 text-gray-900"
                  />
                  <button
                    type="submit"
                    className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-6 rounded-r-full transition duration-300 transform hover:scale-105"
                  >
                    Sign Up
                  </button>
                </div>
              </motion.form>
            </motion.div>
          </main>

          <Footer />
        </div>
      </div>
    </div>
  );
}