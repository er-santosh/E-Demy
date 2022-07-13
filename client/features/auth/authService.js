import axios from "axios";

const API_URL = "/api/";

// Register user
const register = async (userData) => {
  const response = await axios.post(API_URL + "register", userData);
  return response.data;
};

// Login user
const login = async (userData) => {
  const response = await axios.post(API_URL + "login", userData);
  return response.data;
};

// Logout user
const logout = async () => {
  const response = await axios.post(API_URL + "logout");
  return response.data;
};

const authService = {
  register,
  logout,
  login,
};

export default authService;
