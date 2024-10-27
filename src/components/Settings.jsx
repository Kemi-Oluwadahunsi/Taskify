import { useState } from "react";
import { useAppContext } from "../contexts/AppContext";

export default function Settings() {
  const { user, setUser, darkMode, toggleDarkMode, exportData, importData } =
    useAppContext();
  const [editedUser, setEditedUser] = useState(
    user || { username: "", email: "" }
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser({ ...editedUser, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUser(editedUser);
    alert("User settings updated!");
  };

  const handleImport = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const result = e.target?.result;
          if (typeof result === "string") {
            importData(result);
            alert("Data imported successfully!");
          }
        } catch (error) {
          alert("Error importing data:", error);
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Settings</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={editedUser.username}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div className="space-y-2">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={editedUser.email}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="darkMode"
            checked={darkMode}
            onChange={toggleDarkMode}
            className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-offset-0 focus:ring-indigo-200 focus:ring-opacity-50"
          />
          <label
            htmlFor="darkMode"
            className="text-sm font-medium text-gray-700"
          >
            Dark Mode
          </label>
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Save Settings
        </button>
      </form>
      <div className="mt-8 space-y-4">
        <h3 className="text-xl font-bold">Data Management</h3>
        <button
          onClick={exportData}
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Export Data
        </button>
        <div className="space-y-2">
          <label
            htmlFor="importData"
            className="block text-sm font-medium text-gray-700"
          >
            Import Data
          </label>
          <input
            type="file"
            id="importData"
            accept=".json"
            onChange={handleImport}
            className="mt-1 block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-indigo-50 file:text-indigo-700
              hover:file:bg-indigo-100"
          />
        </div>
      </div>
    </div>
  );
}
