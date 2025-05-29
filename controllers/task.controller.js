const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createTask = async (req, res) => {
  const { title, description, assignedToId } = req.body;
  const task = await prisma.task.create({ data: { title, description, assignedToId } });
  res.status(201).json(task);
};

const getAllTasks = async (_, res) => {
  const tasks = await prisma.task.findMany({ include: { assignedTo: true } });
  res.json(tasks);
};

const getMyTasks = async (req, res) => {
  const tasks = await prisma.task.findMany({ where: { assignedToId: req.user.id } });
  res.json(tasks);
};

const updateTaskStatus = async (req, res) => {
  const { status } = req.body;
  const task = await prisma.task.update({
    where: { id: req.params.id },
    data: { status },
  });
  res.json(task);
};

module.exports = { createTask, getAllTasks, getMyTasks, updateTaskStatus };
