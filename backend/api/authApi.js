// backend/api/authApi.js
import axios from "axios";

const API_URL = "http://localhost:5000/api/customers"; // Adjust if needed

export const registerCustomer = async (customerData) => {
  const response = await axios.post(`${API_URL}/register`, customerData);
  return response.data;
};
