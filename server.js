const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = process.env.DB_PORT||4444;
const routes = require('./src/routes/index');
const app=express();
// Middelwares
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Routes
app.use("/api", routes);
// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
