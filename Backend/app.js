const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./src/db/database'); // Importing the database configuration
const expenseRoutes = require('./src/routes/expenseRoutes');
const authRoutes = require('./src/routes/authRoutes');

const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json({
    message: "An expense tracker API",
  });
});

// Use API routes
app.use('/expense', expenseRoutes);
app.use('/auth', authRoutes);

// Starting the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
