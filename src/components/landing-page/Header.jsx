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
          <h1 className="text-3xl font-bold">Taskify</h1>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="space-x-4"
        >
          <Link
            to="/login"
            className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            Sign Up
          </Link>
        </motion.div>
      </nav>
    </header>
  );
}

export default Header