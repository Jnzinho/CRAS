import express from 'express';
import sequelize from './sequelize';
import cors from 'cors';
const app = express();
const port = process.env.PORT || 3000;

import teacherRouter from './routes/teacherRouter';
import loginRouter from './routes/loginRouter';
import gameRouter from './routes/gameRouter';
import categoryRouter from './routes/categoryRouter';
import classRouter from './routes/classRouter';

app.use(cors());

app.use(express.json());
// Teacher route:
app.use('/teachers', teacherRouter);
// Login route:
app.use('/login', loginRouter);
// Game route:
app.use('/games', gameRouter);
// Category route:
app.use('/categories', categoryRouter);
// Class route:
app.use('/classes', classRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
