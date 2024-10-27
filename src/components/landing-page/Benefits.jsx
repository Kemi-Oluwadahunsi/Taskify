import {motion} from "framer-motion"
import { CheckCheck, Sun, Zap, Target, Users, Lock, Star } from "lucide-react";

const Benefits = () => {
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

    const benefits = [
      { icon: <Sun size={24} />, text: "Boost daily productivity" },
      { icon: <Star size={24} />, text: "Achieve your goals faster" },
      { icon: <Users size={24} />, text: "Improve team collaboration" },
      { icon: <Zap size={24} />, text: "Reduce stress and overwhelm" },
      { icon: <Lock size={24} />, text: "Keep your data secure and private" },
      { icon: <Target size={24} />, text: "Access your tasks from anywhere" },
    ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="mb-16 w-full lg:w-3/4 xl:w-2/4 mx-auto lg:px-12"
    >
      <motion.h3
        variants={itemVariants}
        className="text-3xl font-bold mb-8 text-center"
      >
        Why Choose TaskMaster?
      </motion.h3>
      <div className=" flex flex-col gap-4">
        {benefits.map((benefit, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="flex justify-between bg-white bg-opacity-10 px-8 py-4 rounded-lg backdrop-filter backdrop-blur-lg transform transition duration-300 hover:scale-105"
          >
            <div className="flex items-center space-x-8 ">
              <div className="text-pink-400 flex-shrink-0">{benefit.icon}</div>
              <p className="text-lg">{benefit.text}</p>
            </div>

            <CheckCheck size={24} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default Benefits