const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const auth = require('./middleware/auth');

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', auth, taskRoutes);

// Simple Central Error Handler
app.use((err, req, res, next) => {
  res.status(500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

const PORT = parseInt(process.env.PORT, 10) || 5000;
const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Use a different PORT or stop the process already using it.`);
    process.exit(1);
  }
  console.error(error);
  process.exit(1);
});
