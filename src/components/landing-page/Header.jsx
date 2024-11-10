import {motion} from 'framer-motion'
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="container mx-auto px-4 py-8 lg:px-12">
      <nav className="flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <img src='/images/Taskify-Crop.jpg' alt='' className="w-[50%]"/>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="space-x-4"
        >
          <Link
            to="/login"
            className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-6 rounded transition duration-300"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            Sign Up
          </Link>
        </motion.div>
      </nav>
    </header>
  );
}

export default Header