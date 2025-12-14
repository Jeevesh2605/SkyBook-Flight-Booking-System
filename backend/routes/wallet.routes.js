import express from "express";
import { verifyToken } from "../middleware/auth.middleware.js";
import Wallet from "../models/Wallet.js";

const router = express.Router();

router.get("/", verifyToken, async (req, res) => {
  try {
    const wallet = await Wallet.findOne({ userId: req.userId });

    if (!wallet) {
      return res.status(404).json({ message: "Wallet not found" });
    }

    return res.status(200).json({ wallet });
  } catch (error) {
    console.error("Get wallet error:", error);
    return res.status(500).json({ message: "Failed to fetch wallet" });
  }
});

export default router;