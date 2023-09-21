const express = require('express');
const cors = require('cors');
const port = process.env.DB_PORT || 4444;
const routes = require('./src/routes/index');
const app = express();

// Middlewares
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Routes
app.use("/api", routes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
