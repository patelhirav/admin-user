require("dotenv").config();
const express = require("express");
const app = express();
const userRoutes = require("./routes/user.routes");
const taskRoutes = require("./routes/task.routes");

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);

// Root route showing all API URLs
app.get("/", (_, res) => {
  res.send(`
    <h2>Task Management API Endpoints</h2>
    <h3>Authentication</h3>
    <ul>
      <li><b>POST</b> /api/users/signup – User Signup</li>
      <li><b>POST</b> /api/users/login – Login (after approval)</li>
    </ul>
    <h3>Admin</h3>
    <ul>
      <li><b>GET</b> /api/users/pending – View pending users</li>
      <li><b>POST</b> /api/users/approve/:id – Approve user</li>
      <li><b>POST</b> /api/users/reject/:id – Reject user</li>
    </ul>
    <h3>Task Management</h3>
    <ul>
      <li><b>POST</b> /api/tasks – Create task (admin)</li>
      <li><b>GET</b> /api/tasks – View all tasks (admin)</li>
      <li><b>GET</b> /api/tasks/my – View my tasks (user)</li>
      <li><b>PATCH</b> /api/tasks/:id/status – Update task status</li>
    </ul>
  `);
});

app.listen(process.env.PORT, () => {
  console.log(`🚀 Server running on port ${process.env.PORT}`);
});
