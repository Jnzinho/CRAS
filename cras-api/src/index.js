import express from 'express';
const app = express();
const port = process.env.PORT || 3000;
import sequelize from './sequelize';

import teacherRouter from './routes/teacherRouter';

// Teacher route:
app.use('/teachers', teacherRouter);
// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});