import React, { createContext, useState, useEffect } from "react";
import { API_URL } from "../services/api.service";
import { useNavigate } from "react-router-dom";
import { storeToken } from "../services/auth.service";
import axios from "axios";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();
  const authenticateUser = () => {
    const storedToken = localStorage.getItem("authToken");

    // const { user, isLoggedIn, isLoading, setUser, setIsLoggeIn, setIsLoading } =
    //   useContext(AuthContext);

    if (storedToken) {
      return axios
        .get(`${API_URL}/auth/verify`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((response) => {
          // return { user: response.data.user, isLoggedIn: true, isLoading: false };
          setUser(response.data.user);
          setIsLoading(false);
          setIsLoggedIn(true);
        })
        .catch((error) => {
          console.log("Verify - Error:", error.response);
          removeToken();
          navigate("/");
          setUser(null);
          setIsLoading(false);
          setIsLoggedIn(false);
          // return { user: null, isLoggedIn: false, isLoading: false };
        });
    } else {
      // return Promise.resolve({ user: null, isLoggedIn: false, isLoading: false });
      setUser(null);
      setIsLoading(false);
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    authenticateUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        isLoading,
        setIsLoading,
        setUser,
        user,
        storeToken,
        authenticateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider, AuthContext };
