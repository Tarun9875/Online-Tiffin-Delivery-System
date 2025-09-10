import axiosInstance from "./axiosInstance";

// Admin Login
export const adminLogin = async (credentials) => {
  // Expecting { email, password }
  const res = await axiosInstance.post("/auth/admin/login", credentials);
  return res.data; // should contain token and user info
};

// Customer Register
export const registerCustomer = async (data) => {
  const res = await axiosInstance.post("/auth/register", data);
  return res.data; // token + user info
};

// Customer Login (optional, for /customer-login page)
export const customerLogin = async (credentials) => {
  const res = await axiosInstance.post("/auth/customer/login", credentials);
  return res.data;
};
