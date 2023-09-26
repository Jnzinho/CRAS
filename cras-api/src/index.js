import express from 'express';
import sequelize from './sequelize';
import cors from 'cors';
const app = express();
const port = process.env.PORT || 3000;

import teacherRouter from './routes/teacherRouter';
import loginRouter from './routes/loginRouter';

app.use(cors());

app.use(express.json());
// Teacher route:
app.use('/teachers', teacherRouter);
// Login route:
app.use('/login', loginRouter);
// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});