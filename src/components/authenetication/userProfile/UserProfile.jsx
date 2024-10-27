import { useState, useRef } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { useAppContext } from "../../../contexts/AppContext";

const statusOptions = ["Available", "Busy", "Working", "Resting"];

export default function UserProfile() {
  const { currentUser, updateProfile } = useAuth();
  const { darkMode } = useAppContext();
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
      await updateProfile(editedUser);
      setEditMode(false);
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  return (
    <div
      className={`max-w-4xl mx-auto ${
        darkMode ? "bg-gray-800 text-white" : "bg-white"
      } shadow-lg rounded-lg overflow-hidden`}
    >
      <div className="md:flex">
        <div className="md:w-1/3 p-4 bg-gradient-to-b from-primary to-secondary">
          <div className="text-center">
            <img
              src={
                editedUser.profileImage ||
                "/placeholder.svg?height=200&width=200"
              }
              alt="Profile"
              className="w-32 h-32 mx-auto rounded-full border-4 border-white shadow-lg object-cover"
            />
            {editMode && (
              <button
                onClick={() => fileInputRef.current.click()}
                className="mt-4 bg-white text-primary px-4 py-2 rounded-full hover:bg-gray-100 transition duration-300"
              >
                Change Photo
              </button>
            )}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              className="hidden"
              accept="image/*"
            />
          </div>
          <div className="mt-4 text-center">
            <h2 className="text-2xl font-semibold text-white">
              {currentUser.username}
            </h2>
            <p className="text-gray-200">{currentUser.email}</p>
            <p className="mt-2 inline-block bg-white text-primary px-3 py-1 rounded-full text-sm">
              {currentUser.status}
            </p>
          </div>
        </div>
        <div className="md:w-2/3 p-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-semibold">Profile Information</h3>
            {!editMode && (
              <button
                onClick={() => setEditMode(true)}
                className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary transition duration-300"
              >
                Edit Profile
              </button>
            )}
          </div>
          {editMode ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium mb-1"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={editedUser.username}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 rounded-lg ${
                    darkMode ? "bg-gray-700 text-white" : "bg-gray-100"
                  } focus:outline-none focus:ring-2 focus:ring-primary`}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={editedUser.email}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 rounded-lg ${
                    darkMode ? "bg-gray-700 text-white" : "bg-gray-100"
                  } focus:outline-none focus:ring-2 focus:ring-primary`}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="status"
                  className="block text-sm font-medium mb-1"
                >
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={editedUser.status}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 rounded-lg ${
                    darkMode ? "bg-gray-700 text-white" : "bg-gray-100"
                  } focus:outline-none focus:ring-2 focus:ring-primary`}
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end space-x-2 mt-6">
                <button
                  type="button"
                  onClick={() => setEditMode(false)}
                  className="px-4 py-2 rounded-lg bg-gray-300 text-gray-800 hover:bg-gray-400 transition duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-secondary transition duration-300"
                >
                  Save Changes
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-500">Username</h4>
                <p className="text-lg">{currentUser.username}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">Email</h4>
                <p className="text-lg">{currentUser.email}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">Status</h4>
                <p className="text-lg">{currentUser.status}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">
                  Completed Tasks
                </h4>
                <p className="text-lg">{currentUser.completedTasks}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
