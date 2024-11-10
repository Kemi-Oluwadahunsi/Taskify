import { BarChart, Bell, Calendar, Clock,  Moon, Zap } from "lucide-react";

import { motion } from "framer-motion"


 const Features = () => {

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

    const features = [
      {
        icon: <Calendar size={24} />,
        title: "Task Organization",
        description: "Effortlessly organize and prioritize your tasks",
      },
      {
        icon: <Bell size={24} />,
        title: "Smart Reminders",
        description: "Never miss a deadline with intelligent notifications",
      },
      {
        icon: <BarChart size={24} />,
        title: "Progress Tracking",
        description: "Visualize your productivity with insightful charts",
      },
      {
        icon: <Moon size={24} />,
        title: "Dark Mode",
        description: "Easy on the eyes, perfect for night owls",
      },
      {
        icon: <Zap size={24} />,
        title: "Quick Add",
        description: "Add tasks in seconds with natural language processing",
      },
      {
        icon: <Clock size={24} />,
        title: "Time Tracking",
        description: "Monitor time spent on tasks to improve efficiency",
      },
    ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="mb-16 lg:px-12"
    >
      <motion.h3
        variants={itemVariants}
        className="text-3xl font-bold mb-8 text-center"
      >
        Key Features
      </motion.h3>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="bg-white bg-opacity-10 p-6 rounded-lg backdrop-filter backdrop-blur-lg transform transition duration-300 hover:scale-105"
          >
            <div className="text-green-400 mb-4">{feature.icon}</div>
            <h4 className="text-xl font-semibold mb-2">{feature.title}</h4>
            <p className="text-sm opacity-75">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default Features