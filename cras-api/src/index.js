import express from 'express';
const app = express();
const port = process.env.PORT || 3000;
import sequelize from './sequelize';

import teacherRouter from './routes/teacherRouter';

// Define routes and middleware here

const sequelizeTest = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

// Example route:
app.get('/', async (req, res) => {
  const response = await sequelize.query('select * from users');
  res.send(response);
  try {
    await sequelizeTest();
  } catch (error) {
    console.error('Error in sequelizeTest:', error);
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});