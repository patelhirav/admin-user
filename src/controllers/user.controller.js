const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const signup = async (req, res) => {
  const { name, email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  try {
    await prisma.user.create({
      data: { name, email, password: hashed },
    });
    res.status(201).json({ message: "Signup successful, pending approval" });
  } catch {
    res.status(400).json({ error: "Email already exists" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || user.status !== "approved")
    return res.status(403).json({ error: "Not authorized" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ error: "Invalid credentials" });

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
  res.json({ token });
};

const getPendingUsers = async (_, res) => {
  const users = await prisma.user.findMany({ where: { status: "pending" } });
  res.json(users);
};

const approveUser = async (req, res) => {
  await prisma.user.update({
    where: { id: req.params.id },
    data: { status: "approved" },
  });
  res.json({ message: "User approved" });
};

const rejectUser = async (req, res) => {
  await prisma.user.update({
    where: { id: req.params.id },
    data: { status: "rejected" },
  });
  res.json({ message: "User rejected" });
};

module.exports = { signup, login, getPendingUsers, approveUser, rejectUser };
