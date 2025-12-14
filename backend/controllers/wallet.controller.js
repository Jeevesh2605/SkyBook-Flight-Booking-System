import Wallet from "../models/Wallet.js";

export const getWallet = async (req, res) => {
  const wallet = await Wallet.findOne({ userId: req.userId });
  res.json(wallet);
};
