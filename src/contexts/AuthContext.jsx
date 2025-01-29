import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_APP_API_URL;

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
      if (token && userId) {
        try {
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          await fetchUserProfile(userId);
          await fetchLoggedInUser(userId);
        } catch (error) {
          console.error("Error initializing auth:", error);
        }
      }
      setLoading(false);
    };
    initializeAuth();
  }, []);

  useEffect(() => {
    console.log("Current user state updated:", currentUser);
  }, [currentUser]);

  useEffect(() => {
    console.log("Loggedin user id:", loggedInUser);
  }, [loggedInUser]);

  const fetchUserProfile = async (userId) => {
    try {
      console.log("Fetching user profile for userId:", userId);
      const response = await axios.get(`${API_URL}/userprofile/${userId}`);
      console.log("User profile response:", response.data);
      const userProfile = { ...response.data, isLoggedIn: true };
      setCurrentUser(userProfile);
      localStorage.setItem("user", JSON.stringify(userProfile));
      return userProfile;
    } catch (error) {
      console.error("Error fetching user profile:", error);
      throw error.response?.data || new Error("Error fetching user profile");
    }
  };

  const fetchLoggedInUser = async (userId) => {
    try {
      console.log("Fetching logged-in user:", userId);
      const response = await axios.get(`${API_URL}/users/${userId}`);
      const loggedInUserData = response.data;
      setLoggedInUser(loggedInUserData);
      localStorage.setItem("loggedInUser", JSON.stringify(loggedInUserData));
      return loggedInUserData;
    } catch (error) {
      console.error("Error fetching logged-in user:", error);
      throw error.response?.data || new Error("Error fetching logged-in user");
    }
  };

  const initiateSignup = async (name, email, password) => {
    try {
      console.log("Initiating signup process for:", email);
      const response = await axios.post(`${API_URL}/register`, {
        name,
        email,
        password,
      });
      console.log("Signup initiation response:", response.data);
      return {
        message:
          "Please check your email to verify your account and complete the registration.",
      };
    } catch (error) {
      console.error("Error during signup initiation:", error);
      if (error.response) {
        console.error("Error response:", error.response.data);
        throw error.response.data;
      } else if (error.request) {
        console.error("No response received:", error.request);
        throw new Error("No response received from server");
      } else {
        console.error("Error setting up request:", error.message);
        throw new Error("Error setting up request");
      }
    }
  };

  const verifyEmailAndRegister = async (emailToken) => {
    try {
      console.log(
        "Attempting to verify email and register user with token:",
        emailToken
      );
      const response = await axios.get(`${API_URL}/verify-email/${emailToken}`);
      console.log(
        "Email verification and registration response:",
        response.data
      );
      const { token: authToken, user } = response.data;
      localStorage.setItem("token", authToken);
      axios.defaults.headers.common["Authorization"] = `Bearer ${authToken}`;
      setCurrentUser(user);
      return user;
    } catch (error) {
      console.error("Error during email verification and registration:", error);
      if (error.response) {
        console.error("Error response:", error.response.data);
        throw error.response.data;
      } else if (error.request) {
        console.error("No response received:", error.request);
        throw new Error("No response received from server");
      } else {
        console.error("Error setting up request:", error.message);
        throw new Error("Error setting up request");
      }
    }
  };

  const login = async (email, password) => {
    try {
      console.log("Attempting to log in user:", email);
      const response = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });
      console.log("Login response:", response.data);
      const { token } = response.data;
      localStorage.setItem("token", token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      const userId = decodedToken.user.id;
      localStorage.setItem("userId", userId);
      const userProfile = await fetchUserProfile(userId);
      await fetchLoggedInUser(userId);
      return userProfile;
    } catch (error) {
      console.error("Error during login:", error);
      throw error.response?.data || new Error("Network error");
    }
  };

  const logout = async () => {
    try {
      console.log("Attempting to log out user");
      const email = currentUser?.email;
      await axios.post(`${API_URL}/logout`, { email });
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("user");
      localStorage.removeItem("loggedInUser");
      delete axios.defaults.headers.common["Authorization"];
      setCurrentUser(null);
      console.log("User logged out successfully");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const forgotPassword = async (email) => {
    try {
      console.log("Requesting password reset for:", email);
      const response = await axios.post(`${API_URL}/forgot-password`, {
        email,
      });
      console.log("Password reset request response:", response.data);
      return response.data.message;
    } catch (error) {
      console.error("Error requesting password reset:", error);
      throw (
        error.response?.data?.message ||
        "An error occurred while requesting password reset."
      );
    }
  };

  const resetPassword = async (token, newPassword) => {
    try {
      console.log(`Attempting to reset password with token: ${token}`);
      const response = await axios.post(`${API_URL}/reset-password/${token}`, {
        newPassword,
      });
      console.log("Password reset response:", response.data);
      return response.data.message;
    } catch (error) {
      console.error("Error resetting password:", error);
      throw error.response?.data?.message || "Failed to reset password";
    }
  };

  const updateProfile = async (updatedProfile, userId) => {
    try {
      console.log("Attempting to update user profile");
      const response = await axios.put(
        `${API_URL}/userprofile/${userId}`,
        updatedProfile
      );
      console.log("Profile update response:", response.data);
      await fetchUserProfile(userId);
      return response.data;
    } catch (error) {
      console.error("Error updating profile:", error);
      throw error.response?.data || new Error("Network error");
    }
  };

  const deleteAccount = async () => {
    try {
      console.log("Attempting to delete user account");
      await axios.delete(`${API_URL}/delete-account/${currentUser.id}`);
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("user");
      delete axios.defaults.headers.common["Authorization"];
      setCurrentUser(null);
      console.log("User account deleted successfully");
    } catch (error) {
      console.error("Error deleting account:", error);
      throw error.response?.data || new Error("Network error");
    }
  };

  const value = {
    currentUser,
    loggedInUser,
    loading,
    initiateSignup,
    verifyEmailAndRegister,
    login,
    logout,
    forgotPassword,
    resetPassword,
    updateProfile,
    deleteAccount,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
