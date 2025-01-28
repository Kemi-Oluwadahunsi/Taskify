// import { useState, useRef } from "react";
// import { useAuth } from "../../../contexts/AuthContext";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import { Camera, Check, X, LogOut } from "lucide-react";

// const statusOptions = ["Available", "Busy", "Working", "Resting"];

// export default function UserProfile() {
//   const { currentUser, updateProfile, logout, fetchUserProfile } = useAuth();
//   const navigate = useNavigate();
//   const [editMode, setEditMode] = useState(false);
//   const [editedUser, setEditedUser] = useState(currentUser);
//   const fileInputRef = useRef(null);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setEditedUser((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setEditedUser((prev) => ({ ...prev, profileImage: reader.result }));
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await updateProfile(editedUser);
//       setEditMode(false);
//     } catch (error) {
//       console.error("Failed to update profile:", error);
//     }
//   };

//   const handleLogout = async () => {
//     try {
//       await logout();
//       navigate("/login");
//     } catch (error) {
//       console.error("Failed to logout:", error);
//     }
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden"
//       >
//         <div className="md:flex">
//           <div className="md:w-1/3 bg-gradient-to-br from-purple-600 to-pink-500 p-8">
//             <div className="text-center">
//               <div className="relative inline-block">
//                 <img
//                   src={editedUser?.profileImage || "/images/authbg.webp"}
//                   alt="Profile"
//                   className="w-32 h-32 mx-auto rounded-full border-4 border-white shadow-lg object-cover"
//                 />
//                 {editMode && (
//                   <button
//                     onClick={() => fileInputRef.current.click()}
//                     className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition duration-300"
//                   >
//                     <Camera size={20} className="text-purple-600" />
//                   </button>
//                 )}
//               </div>
//               <input
//                 type="file"
//                 ref={fileInputRef}
//                 onChange={handleImageUpload}
//                 className="hidden"
//                 accept="image/*"
//               />
//             </div>
//             <div className="mt-6 text-center">
//               <h2 className="text-2xl font-bold text-white">
//                 {currentUser?.username || "Kemi Dahunsi"}
//               </h2>
//               <p className="text-purple-200 mt-1">
//                 {currentUser?.email || "oluwakemioluwadahunsi@gmail.com"}
//               </p>
//               <p className="mt-4 inline-block bg-white text-purple-600 px-4 py-1 rounded-full text-sm font-medium">
//                 {currentUser?.status || "Working"}
//               </p>
//             </div>
//           </div>
//           <div className="md:w-2/3 p-8">
//             <div className="flex justify-between items-center mb-6">
//               <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
//                 Profile Information
//               </h3>
//               {!editMode && (
//                 <div className="flex flex-col gap-2">
//                   <motion.button
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                     onClick={() => setEditMode(true)}
//                     className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition duration-300"
//                   >
//                     Edit Profile
//                   </motion.button>
//                   <motion.button
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                     onClick={handleLogout}
//                     className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300 flex items-center"
//                   >
//                     <LogOut size={18} className="mr-2" />
//                     Logout
//                   </motion.button>
//                 </div>
//               )}
//             </div>
//             {editMode ? (
//               <form onSubmit={handleSubmit} className="space-y-6">
//                 <div>
//                   <label
//                     htmlFor="username"
//                     className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
//                   >
//                     Username
//                   </label>
//                   <input
//                     type="text"
//                     id="username"
//                     name="username"
//                     value={editedUser?.username || "Kemi Dahunsi"}
//                     onChange={handleInputChange}
//                     className="w-full px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label
//                     htmlFor="email"
//                     className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
//                   >
//                     Email
//                   </label>
//                   <input
//                     type="email"
//                     id="email"
//                     name="email"
//                     value={
//                       editedUser?.email || "oluwakemioluwadahunsi@gmail.com"
//                     }
//                     onChange={handleInputChange}
//                     className="w-full px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label
//                     htmlFor="status"
//                     className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
//                   >
//                     Status
//                   </label>
//                   <select
//                     id="status"
//                     name="status"
//                     value={editedUser?.status || "Working"}
//                     onChange={handleInputChange}
//                     className="w-full px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
//                   >
//                     {statusOptions.map((status) => (
//                       <option key={status} value={status}>
//                         {status}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//                 <div className="flex justify-end space-x-3 mt-6">
//                   <motion.button
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                     type="button"
//                     onClick={() => setEditMode(false)}
//                     className="px-4 py-2 rounded-lg bg-gray-300 text-gray-800 hover:bg-gray-400 transition duration-300 flex items-center"
//                   >
//                     <X size={18} className="mr-2" />
//                     Cancel
//                   </motion.button>
//                   <motion.button
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                     type="submit"
//                     className="px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition duration-300 flex items-center"
//                   >
//                     <Check size={18} className="mr-2" />
//                     Save Changes
//                   </motion.button>
//                 </div>
//               </form>
//             ) : (
//               <div className="space-y-6">
//                 <div>
//                   <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
//                     Username
//                   </h4>
//                   <p className="text-lg text-gray-900 dark:text-white">
//                     {currentUser?.username || "Kemi Dahunsi"}
//                   </p>
//                 </div>
//                 <div>
//                   <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
//                     Email
//                   </h4>
//                   <p className="text-lg text-gray-900 dark:text-white">
//                     {currentUser?.email || "oluwakemioluwadahunsi@gmail.com"}
//                   </p>
//                 </div>
//                 <div>
//                   <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
//                     Status
//                   </h4>
//                   <p className="text-lg text-gray-900 dark:text-white">
//                     {currentUser?.status || "Working"}
//                   </p>
//                 </div>
//                 <div>
//                   <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
//                     Completed Tasks
//                   </h4>
//                   <p className="text-lg text-gray-900 dark:text-white">
//                     {currentUser?.completedTasks || 0}
//                   </p>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </motion.div>
//     </div>
//   );
// }


import { useState, useRef } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Camera, Check, X, LogOut } from "lucide-react";

// const statusOptions = ["Available", "Busy", "Working", "Resting"];

export default function UserProfile() {
  const { currentUser, updateProfile, logout } = useAuth();
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [editedUser, setEditedUser] = useState(currentUser);
  const fileInputRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedUser((prev) => ({ ...prev, profileImage: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(editedUser, currentUser.userId);
      setEditMode(false);
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden"
      >
        <div className="md:flex">
          <div className="md:w-1/3 bg-gradient-to-br from-purple-600 to-pink-500 p-8">
            <div className="text-center">
              <div className="relative inline-block">
                <img
                  src={editedUser?.profileImage || "/images/authbg.webp"}
                  alt="Profile"
                  className="w-32 h-32 mx-auto rounded-full border-4 border-white shadow-lg object-cover"
                />
                {editMode && (
                  <button
                    onClick={() => fileInputRef.current.click()}
                    className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition duration-300"
                  >
                    <Camera size={20} className="text-purple-600" />
                  </button>
                )}
              </div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                className="hidden"
                accept="image/*"
              />
            </div>
            <div className="mt-6 text-center">
              <h2 className="text-2xl font-bold text-white">
                {currentUser?.name}
              </h2>
              <p className="text-purple-200 mt-1">{currentUser?.email}</p>
              <p className="mt-4 inline-block bg-white text-purple-600 px-4 py-1 rounded-full text-sm font-medium">
                {currentUser?.isLoggedIn ? "Online" : "Offline"}
              </p>
            </div>
          </div>
          <div className="md:w-2/3 p-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                Profile Information
              </h3>
              {!editMode && (
                <div className="flex flex-col gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setEditMode(true)}
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition duration-300"
                  >
                    Edit Profile
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleLogout}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300 flex items-center"
                  >
                    <LogOut size={18} className="mr-2" />
                    Logout
                  </motion.button>
                </div>
              )}
            </div>
            {editMode ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={editedUser?.name || ""}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={editedUser?.email || ""}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>
                <div className="flex justify-end space-x-3 mt-6">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={() => setEditMode(false)}
                    className="px-4 py-2 rounded-lg bg-gray-300 text-gray-800 hover:bg-gray-400 transition duration-300 flex items-center"
                  >
                    <X size={18} className="mr-2" />
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition duration-300 flex items-center"
                  >
                    <Check size={18} className="mr-2" />
                    Save Changes
                  </motion.button>
                </div>
              </form>
            ) : (
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Name
                  </h4>
                  <p className="text-lg text-gray-900 dark:text-white">
                    {currentUser?.name}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Email
                  </h4>
                  <p className="text-lg text-gray-900 dark:text-white">
                    {currentUser?.email}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    User ID
                  </h4>
                  <p className="text-lg text-gray-900 dark:text-white">
                    {currentUser?.userid}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Login Status
                  </h4>
                  <p className="text-lg text-gray-900 dark:text-white">
                    {currentUser?.isLoggedIn ? "Logged In" : "Logged Out"}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

