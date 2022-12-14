import db from "../../../libs/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { email, password } = JSON.parse(req.body);

  const checkUser = await db("users").where({ email }).first();

  // Anhautorized
  if (!checkUser) return res.status(401).end();

  // Cek password sesuai sama database
  const checkPassword = await bcrypt.compare(password, checkUser.password);

  if (!checkPassword) {
    return res.status(401).end();
  }

  const token = jwt.sign(
    { id: checkUser.id, email: checkUser.email },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.status(200).json({
    message: "Login Succesfully",
    token,
  });
}
