const express = require('express');
const cors = require('cors');
const { syncDB } = require('./models');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');
const errorHandler = require('./utils/errorHandler');
const logger = require('./utils/logger');
const { swaggerUi, swaggerSpec } = require('./swagger');
require('dotenv').config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Swagger setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/analytics', analyticsRoutes);

// Error handling
app.use(errorHandler);

// Sync database and start server
const PORT = process.env.PORT || 3000;
syncDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Failed to synchronize database:', err);
});


//  http://localhost:3000/api-docs/#/