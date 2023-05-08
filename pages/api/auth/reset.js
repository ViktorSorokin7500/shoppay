import nc from "next-connect";
import bcrypt from "bcrypt";

import db from "../../../utils/db";
import { validateEmail } from "../../../utils/validation";
import { createActivationToken, createResetToken } from "../../../utils/tokens";
import { sendEmail } from "../../../utils/sendEmails";

import User from "../../../models/User";
import { resetEmailTemplate } from "@/emails/resetEmailTemplate";

const handler = nc();

handler.put(async (req, res) => {
  try {
    await db.connectDb();
    const { user_id, password } = req.body;
    const user = await User.findById(user_id);
    if (!user) {
      return res.status(400).json({ message: "This Account doesn't exist" });
    }
    const cryptedPassword = await bcrypt.hash(password, 12);
    await user.updateOne({
      password: cryptedPassword,
    });
    res.json({ email: user.email });

    await db.disconnectDb();
    res.json({
      message: "Email has been sent to you",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default handler;
