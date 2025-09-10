// backend/routes/customerRoutes.js
import express from "express";
import Customer from "../models/Customer.js"; // MongoDB model

const router = express.Router();

// ✅ Plain text password (no encryption)
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if email already exists
    const existingCustomer = await Customer.findOne({ email });
    if (existingCustomer) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Save customer with plain password
    const customer = new Customer({ name, email, password });
    await customer.save();

    res.status(201).json({ message: "Registration successful", customer });
  } catch (error) {
    res.status(500).json({ message: "Registration failed", error: error.message });
  }
});

export default router;
