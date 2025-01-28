import { Github, HelpCircle, Star } from 'lucide-react';
import {motion} from "framer-motion"

const Footer = () => {
  return (
    <footer className="bg-indigo-900 bg-opacity-50">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row justify-between items-center"
        >
          <div className="text-center md:text-left mb-4 md:mb-0">
            <h3 className="text-2xl font-bold mb-2">Taskify</h3>
            <p className="text-sm opacity-75">
              © 2023 TaskMaster. All rights reserved.
            </p>
          </div>
          <div className="flex space-x-4">
            <motion.a
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              href="#"
              className="text-white hover:text-pink-400 transition duration-300"
            >
              <Github size={24} />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              href="#"
              className="text-white hover:text-pink-400 transition duration-300"
            >
              <Star size={24} />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              href="#"
              className="text-white hover:text-pink-400 transition duration-300"
            >
              <HelpCircle size={24} />
            </motion.a>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 text-center"
        >
          <a
            href="#"
            className="text-sm text-white hover:text-pink-400 transition duration-300 mr-4"
          >
            Terms of Service
          </a>
          <a
            href="#"
            className="text-sm text-white hover:text-pink-400 transition duration-300 mr-4"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="text-sm text-white hover:text-pink-400 transition duration-300"
          >
            Contact Us
          </a>
        </motion.div>
      </div>
    </footer>
  );
}

export default Footer