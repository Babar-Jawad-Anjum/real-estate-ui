import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  // Safely parse the user from localStorage
  const [currentUser, setCurrentUser] = useState(() => {
    const storedUser = localStorage.getItem("user");

    // Check if the user exists and is not "undefined"
    if (storedUser && storedUser !== "undefined") {
      try {
        return JSON.parse(storedUser);
      } catch (error) {
        // If parsing fails, return null
        return null;
      }
    }
    return null;
  });

  const updateUser = (data) => {
    setCurrentUser(data);
  };

  useEffect(() => {
    if (currentUser === null) {
      localStorage.removeItem("user");
    } else {
      localStorage.setItem("user", JSON.stringify(currentUser));
    }
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};
