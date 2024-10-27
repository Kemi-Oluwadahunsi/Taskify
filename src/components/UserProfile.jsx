// import { useState, useEffect } from "react";
// import { useAuth } from "../context/AuthContext";
// import { getUserProfile, updateUserProfile } from "../services/api";
// import { motion } from "framer-motion";

// export default function UserProfile() {
//   const {  login } = useAuth();
//   const [profile, setProfile] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//   });

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const data = await getUserProfile();
//         setProfile(data);
//         setFormData({
//           username: data.username,
//           email: data.email,
//         });
//       } catch (error) {
//         console.error("Error fetching user profile:", error);
//       }
//     };
//     fetchProfile();
//   }, []);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const updatedProfile = await updateUserProfile(formData);
//       setProfile(updatedProfile);
//       login(updatedProfile);
//       setIsEditing(false);
//     } catch (error) {
//       console.error("Error updating user profile:", error);
//     }
//   };

//   if (!profile) {
//     return (
//       <div className="text-center mt-8 text-gray-600 dark:text-gray-300">
//         Loading...
//       </div>
//     );
//   }

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       className="max-w-md mx-auto mt-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
//     >
//       <h2 className="text-2xl font-bold mb-6 text-primary dark:text-accent text-center">
//         User Profile
//       </h2>
//       {isEditing ? (
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label
//               htmlFor="username"
//               className="block text-sm font-medium text-gray-700 dark:text-gray-300"
//             >
//               Username
//             </label>
//             <input
//               type="text"
//               name="username"
//               id="username"
//               value={formData.username}
//               onChange={handleChange}
//               className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:text-white transition-colors duration-200"
//             />
//           </div>
//           <div>
//             <label
//               htmlFor="email"
//               className="block text-sm font-medium text-gray-700 dark:text-gray-300"
//             >
//               Email
//             </label>
//             <input
//               type="email"
//               name="email"
//               id="email"
//               value={formData.email}
//               onChange={handleChange}
//               className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:text-white transition-colors duration-200"
//             />
//           </div>
//           <div className="flex justify-end space-x-2">
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               type="button"
//               onClick={() => setIsEditing(false)}
//               className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
//             >
//               Cancel
//             </motion.button>
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               type="submit"
//               className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:bg-accent dark:hover:bg-secondary transition-colors duration-200"
//             >
//               Save
//             </motion.button>
//           </div>
//         </form>
//       ) : (
//         <div className="space-y-4">
//           <p className="text-gray-700 dark:text-gray-300">
//             <span className="font-semibold">Username:</span> {profile.username}
//           </p>
//           <p className="text-gray-700 dark:text-gray-300">
//             <span className="font-semibold">Email:</span> {profile.email}
//           </p>
//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             onClick={() => setIsEditing(true)}
//             className="w-full px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:bg-accent dark:hover:bg-secondary transition-colors duration-200"
//           >
//             Edit Profile
//           </motion.button>
//         </div>
//       )}
//     </motion.div>
//   );
// }

import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { updateUserProfile } from "../services/api";
import { motion } from "framer-motion";

export default function UserProfile() {
  const { user, updateUser } = useAuth();
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
  });

  useEffect(() => {
    if (user) {
      setProfile(user);
      setFormData({
        username: user.username,
        email: user.email,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedProfile = await updateUserProfile(formData);
      updateUser(updatedProfile);
      setProfile(updatedProfile);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating user profile:", error);
    }
  };

  if (!profile) {
    return (
      <div className="text-center mt-8 text-gray-600 dark:text-gray-300">
        Loading...
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md mx-auto mt-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-bold mb-6 text-primary dark:text-accent text-center">
        User Profile
      </h2>
      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              value={formData.username}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:text-white transition-colors duration-200"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:text-white transition-colors duration-200"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              Cancel
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:bg-accent dark:hover:bg-secondary transition-colors duration-200"
            >
              Save
            </motion.button>
          </div>
        </form>
      ) : (
        <div className="space-y-4">
          <p className="text-gray-700 dark:text-gray-300">
            <span className="font-semibold">Username:</span> {profile.username}
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            <span className="font-semibold">Email:</span> {profile.email}
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsEditing(true)}
            className="w-full px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:bg-accent dark:hover:bg-secondary transition-colors duration-200"
          >
            Edit Profile
          </motion.button>
        </div>
      )}
    </motion.div>
  );
}