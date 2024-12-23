import { API_URL } from "./api.service";
import axios from "axios";

import { useContext } from "react";

import { AuthContext } from "../context/auth.context";

import { useNavigate } from "react-router-dom";

export const storeToken = (token) => {
  localStorage.setItem("authToken", token);
  console.log("Line 6 - Token:", token);
};

export const removeToken = () => {
  localStorage.clear();
};

export const authenticateUser = () => {
  const storedToken = localStorage.getItem("authToken");

  const { user, isLoggedIn, isLoading, setUser, setIsLoggeIn, setIsLoading } =
    useContext(AuthContext);

  const navigate = useNavigate();

  if (storedToken) {
    return axios
      .get(`${API_URL}/auth/verify`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        // return { user: response.data.user, isLoggedIn: true, isLoading: false };
        setUser(response.data.user);
        setIsLoading(false);
        setIsLoggeIn(true);
      })
      .catch((error) => {
        console.log("Verify - Error:", error.response);
        removeToken();
        navigate('/');
        setUser(null);
        setIsLoading(false);
        setIsLoggeIn(false);
        // return { user: null, isLoggedIn: false, isLoading: false };
      });
  } else {
    // return Promise.resolve({ user: null, isLoggedIn: false, isLoading: false });
    setUser(null);
    setIsLoading(false);
    setIsLoggeIn(false);
  }
};

export const signup = async (
  name,
  lastName,
  email,
  password,
  telephone,
  address,
  nationalID,
  setUser
) => {
  const requestBody = {
    name,
    lastName,
    email,
    password,
    telephone,
    address,
    nationalID,
  };

  try {
    const response = await axios.post(`${API_URL}/auth/signup`, requestBody);
    console.log("Line 50 - Created User:", response);
    if (response.data.success) {
      storeToken(response.data.authToken);
      setUser(response.data.user);
      console.log("Line 72 - setUser:", response.data.user);
    }

    console.log("Line 58 - response.data:", response.data);
    return response;
  } catch (error) {
    console.log("Line 61 - Error:", error);
    throw error;
  }
};

export const login = async (email, password, setUser) => {
  const requestBody = { email, password };

  try {
    const response = await axios.post(`${API_URL}/auth/login`, requestBody);

    if (response.data.success) {
      storeToken(response.data.authToken);
      setUser(response.data.user);
      console.log("Line 72 - setUser:", response.data.user);
    }

    return response.data;
  } catch (error) {
    console.log("Line 83 - Error:", error);
    throw error;
  }
};
