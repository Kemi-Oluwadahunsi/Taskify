// import { createContext, useState, useContext, useEffect } from "react";
// import axios from "axios";

// const API_URL = import.meta.env.VITE_APP_API_URL;

// const AuthContext = createContext();

// export function useAuth() {
//   return useContext(AuthContext);
// }

// export function AuthProvider({ children }) {
//   const [currentUser, setCurrentUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//       fetchUserProfile();
//     } else {
//       setLoading(false);
//     }
//   }, []);

//   const fetchUserProfile = async () => {
//     try {
//       const response = await axios.get(`${API_URL}/userprofile`);
//       setCurrentUser(response.data);
//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching user profile:", error);
//       setLoading(false);
//     }
//   };

//   const signup = async (name, email, password) => {
//     try {
//       console.log("Attempting to initiate registration for:", { name, email });
//       const response = await axios.post(`${API_URL}/register`, {
//         name,
//         email,
//         password,
//       });
//       console.log("Registration initiation response:", response.data);
//       return response.data;
//     } catch (error) {
//       console.error("Error during registration initiation:", error);
//       if (error.response) {
//         console.error("Error response:", error.response.data);
//         throw error.response.data;
//       } else if (error.request) {
//         console.error("No response received:", error.request);
//         throw new Error("No response received from server");
//       } else {
//         console.error("Error setting up request:", error.message);
//         throw new Error("Error setting up request");
//       }
//     }
//   };

//   const verifyEmail = async (token) => {
//     try {
//       console.log("Attempting to verify email with token:", token);
//       const response = await axios.post(`${API_URL}/verify-email`, { token });
//       console.log("Email verification response:", response.data);
//       const { token: authToken, user } = response.data;
//       localStorage.setItem("token", authToken);
//       axios.defaults.headers.common["Authorization"] = `Bearer ${authToken}`;
//       setCurrentUser(user);
//       return user;
//     } catch (error) {
//       console.error("Error during email verification:", error);
//       if (error.response) {
//         console.error("Error response:", error.response.data);
//         throw error.response.data;
//       } else if (error.request) {
//         console.error("No response received:", error.request);
//         throw new Error("No response received from server");
//       } else {
//         console.error("Error setting up request:", error.message);
//         throw new Error("Error setting up request");
//       }
//     }
//   };

//   const login = async (email, password) => {
//     try {
//       console.log("Attempting to log in user:", email);
//       const response = await axios.get(`${API_URL}/login`, {
//         params: { email, password },
//       });
//       console.log("Login response:", response.data);
//       const { token, user } = response.data;
//       localStorage.setItem("token", token);
//       axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//       setCurrentUser(user);
//       return user;
//     } catch (error) {
//       console.error("Error during login:", error);
//       throw error.response ? error.response.data : new Error("Network error");
//     }
//   };

//   const logout = async () => {
//     try {
//       console.log("Attempting to log out user");
//       await axios.delete(`${API_URL}/logout`);
//       localStorage.removeItem("token");
//       delete axios.defaults.headers.common["Authorization"];
//       setCurrentUser(null);
//       console.log("User logged out successfully");
//     } catch (error) {
//       console.error("Error during logout:", error);
//     }
//   };

//   const forgotPassword = async (email) => {
//     try {
//       console.log("Requesting password reset for:", email);
//       await axios.post(`${API_URL}/forgot-password`, { email });
//       console.log("Password reset request sent successfully");
//     } catch (error) {
//       console.error("Error requesting password reset:", error);
//       throw error.response ? error.response.data : new Error("Network error");
//     }
//   };

//   const resetPassword = async (token, newPassword) => {
//     try {
//       console.log("Attempting to reset password");
//       await axios.post(`${API_URL}/reset-password/${token}`, {
//         password: newPassword,
//       });
//       console.log("Password reset successfully");
//     } catch (error) {
//       console.error("Error resetting password:", error);
//       throw error.response ? error.response.data : new Error("Network error");
//     }
//   };

//   const updateProfile = async (updatedProfile) => {
//     try {
//       console.log("Attempting to update user profile");
//       const response = await axios.put(
//         `${API_URL}/users/${currentUser.id}`,
//         updatedProfile
//       );
//       console.log("Profile update response:", response.data);
//       setCurrentUser(response.data);
//       return response.data;
//     } catch (error) {
//       console.error("Error updating profile:", error);
//       throw error.response ? error.response.data : new Error("Network error");
//     }
//   };

//   const deleteAccount = async () => {
//     try {
//       console.log("Attempting to delete user account");
//       await axios.delete(`${API_URL}/delete-account/${currentUser.id}`);
//       localStorage.removeItem("token");
//       delete axios.defaults.headers.common["Authorization"];
//       setCurrentUser(null);
//       console.log("User account deleted successfully");
//     } catch (error) {
//       console.error("Error deleting account:", error);
//       throw error.response ? error.response.data : new Error("Network error");
//     }
//   };

//   const value = {
//     currentUser,
//     signup,
//     login,
//     logout,
//     forgotPassword,
//     resetPassword,
//     updateProfile,
//     verifyEmail,
//     deleteAccount,
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// }

// import { createContext, useState, useContext, useEffect } from "react";
// import axios from "axios";

// const API_URL = import.meta.env.VITE_APP_API_URL;

// const AuthContext = createContext();

// export function useAuth() {
//   return useContext(AuthContext);
// }

// export function AuthProvider({ children }) {
//   const [currentUser, setCurrentUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//       fetchUserProfile();
//     } else {
//       setLoading(false);
//     }
//   }, []);

//   const fetchUserProfile = async () => {
//     try {
//       const response = await axios.get(`${API_URL}/userprofile`);
//       setCurrentUser(response.data);
//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching user profile:", error);
//       setLoading(false);
//     }
//   };

//   const initiateSignup = async (name, email, password) => {
//     try {
//       console.log("Initiating signup process for:", email);
//       const response = await axios.post(`${API_URL}/register`, {
//         name,
//         email,
//         password,
//       });
//       console.log("Signup initiation response:", response.data);
//       return {
//         message:
//           "Please check your email to verify your account and complete the registration.",
//       };
//     } catch (error) {
//       console.error("Error during signup initiation:", error);
//       if (error.response) {
//         console.error("Error response:", error.response.data);
//         throw error.response.data;
//       } else if (error.request) {
//         console.error("No response received:", error.request);
//         throw new Error("No response received from server");
//       } else {
//         console.error("Error setting up request:", error.message);
//         throw new Error("Error setting up request");
//       }
//     }
//   };

//   const verifyEmailAndRegister = async (emailToken) => {
//     try {
//       console.log(
//         "Attempting to verify email and register user with token:",
//         emailToken
//       );
//       const response = await axios.post(
//         `${API_URL}/verify-email/${emailToken}`
//       );
//       console.log(
//         "Email verification and registration response:",
//         response.data
//       );
//       const { token: authToken, user } = response.data;
//       localStorage.setItem("token", authToken);
//       axios.defaults.headers.common["Authorization"] = `Bearer ${authToken}`;
//       setCurrentUser(user);
//       return user;
//     } catch (error) {
//       console.error("Error during email verification and registration:", error);
//       if (error.response) {
//         console.error("Error response:", error.response.data);
//         throw error.response.data;
//       } else if (error.request) {
//         console.error("No response received:", error.request);
//         throw new Error("No response received from server");
//       } else {
//         console.error("Error setting up request:", error.message);
//         throw new Error("Error setting up request");
//       }
//     }
//   };

//   const login = async (email, password) => {
//     try {
//       console.log("Attempting to log in user:", email);
//       const response = await axios.post(`${API_URL}/login`, {
//         email,
//         password,
//       });
//       console.log("Login response:", response.data);
//       const { token, user } = response.data;
//       localStorage.setItem("token", token);
//       axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//       setCurrentUser(user);
//       return user;
//     } catch (error) {
//       console.error("Error during login:", error);
//       throw error.response ? error.response.data : new Error("Network error");
//     }
//   };

//   const logout = async () => {
//     try {
//       console.log("Attempting to log out user");
//       await axios.delete(`${API_URL}/logout`);
//       localStorage.removeItem("token");
//       delete axios.defaults.headers.common["Authorization"];
//       setCurrentUser(null);
//       console.log("User logged out successfully");
//     } catch (error) {
//       console.error("Error during logout:", error);
//     }
//   };

//   const forgotPassword = async (email) => {
//     try {
//       console.log("Requesting password reset for:", email);
//       await axios.post(`${API_URL}/forgot-password`, { email });
//       console.log("Password reset request sent successfully");
//     } catch (error) {
//       console.error("Error requesting password reset:", error);
//       throw error.response ? error.response.data : new Error("Network error");
//     }
//   };

//   const resetPassword = async (token, newPassword) => {
//     try {
//       console.log("Attempting to reset password");
//       await axios.post(`${API_URL}/reset-password/${token}`, {
//         password: newPassword,
//       });
//       console.log("Password reset successfully");
//     } catch (error) {
//       console.error("Error resetting password:", error);
//       throw error.response ? error.response.data : new Error("Network error");
//     }
//   };

//   const updateProfile = async (updatedProfile) => {
//     try {
//       console.log("Attempting to update user profile");
//       const response = await axios.put(
//         `${API_URL}/users/${currentUser.id}`,
//         updatedProfile
//       );
//       console.log("Profile update response:", response.data);
//       setCurrentUser(response.data);
//       return response.data;
//     } catch (error) {
//       console.error("Error updating profile:", error);
//       throw error.response ? error.response.data : new Error("Network error");
//     }
//   };

//   const deleteAccount = async () => {
//     try {
//       console.log("Attempting to delete user account");
//       await axios.delete(`${API_URL}/delete-account/${currentUser.id}`);
//       localStorage.removeItem("token");
//       delete axios.defaults.headers.common["Authorization"];
//       setCurrentUser(null);
//       console.log("User account deleted successfully");
//     } catch (error) {
//       console.error("Error deleting account:", error);
//       throw error.response ? error.response.data : new Error("Network error");
//     }
//   };

//   const value = {
//     currentUser,
//     initiateSignup,
//     verifyEmailAndRegister,
//     login,
//     logout,
//     forgotPassword,
//     resetPassword,
//     updateProfile,
//     deleteAccount,
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// }

import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_APP_API_URL;

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      fetchUserProfile();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get(`${API_URL}/userprofile`);
      setCurrentUser(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching user profile:", error);
      setLoading(false);
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
      const { token, user } = response.data;
      localStorage.setItem("token", token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setCurrentUser(user);
      console.log(user);
      return user;
    } catch (error) {
      console.error("Error during login:", error);
      throw error.response ? error.response.data : new Error("Network error");
    }
  };

  const logout = async () => {
    try {
      console.log("Attempting to log out user");
      await axios.delete(`${API_URL}/logout`);
      localStorage.removeItem("token");
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
      if (error.response && error.response.data) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error("An error occurred while requesting password reset.");
      }
    }
  };

  const resetPassword = async (token, newPassword) => {
    try {
      console.log("Attempting to reset password");
      const response = await axios.post(`${API_URL}/reset-password/${token}`, {
        newPassword,
      });
      console.log("Password reset response:", response.data);
      return response.data.message;
    } catch (error) {
      console.error("Error resetting password:", error);
      if (error.response) {
        console.error("Error response:", error.response.data);
        throw new Error(
          error.response.data.message || "Failed to reset password"
        );
      } else if (error.request) {
        console.error("No response received:", error.request);
        throw new Error("No response received from server");
      } else {
        console.error("Error setting up request:", error.message);
        throw new Error("Error setting up request");
      }
    }
  };

  // const forgotPassword = async (email) => {
  //   try {
  //     console.log("Requesting password reset for:", email);
  //     await axios.post(`${API_URL}/forgot-password`, { email });
  //     console.log("Password reset request sent successfully");
  //   } catch (error) {
  //     console.error("Error requesting password reset:", error);
  //     throw error.response ? error.response.data : new Error("Network error");
  //   }
  // };

  // const resetPassword = async (token, newPassword) => {
  //   try {
  //     console.log("Attempting to reset password");
  //     await axios.post(`${API_URL}/reset-password/${token}`, {
  //       password: newPassword,
  //     });
  //     console.log("Password reset successfully");
  //   } catch (error) {
  //     console.error("Error resetting password:", error);
  //     throw error.response ? error.response.data : new Error("Network error");
  //   }
  // };

  const updateProfile = async (updatedProfile) => {
    try {
      console.log("Attempting to update user profile");
      const response = await axios.put(
        `${API_URL}/users/${currentUser.id}`,
        updatedProfile
      );
      console.log("Profile update response:", response.data);
      setCurrentUser(response.data);
      return response.data;
    } catch (error) {
      console.error("Error updating profile:", error);
      throw error.response ? error.response.data : new Error("Network error");
    }
  };

  const deleteAccount = async () => {
    try {
      console.log("Attempting to delete user account");
      await axios.delete(`${API_URL}/delete-account/${currentUser.id}`);
      localStorage.removeItem("token");
      delete axios.defaults.headers.common["Authorization"];
      setCurrentUser(null);
      console.log("User account deleted successfully");
    } catch (error) {
      console.error("Error deleting account:", error);
      throw error.response ? error.response.data : new Error("Network error");
    }
  };

  const value = {
    currentUser,
    initiateSignup,
    verifyEmailAndRegister,
    login,
    logout,
    forgotPassword,
    resetPassword,
    updateProfile,
    deleteAccount,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
