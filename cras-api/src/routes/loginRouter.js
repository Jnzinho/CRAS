import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Teacher } from '../models/teacherModel';

const router = express.Router();

router.post('/', async (req, res, next) => {
  try {
    const user = await Teacher.findOne({ where: { username: req.body.username } });
    if(user) {
      const passwordMatch = await bcrypt.compare(req.body.password, user.password);
      if(passwordMatch) {
        const token = jwt.sign({
          "id": user.id,
          "username": user.username,
          "name": user.name,
        }, process.env.JWT_SECRET);
        res.status(400).json({ token });
      } else {
        res.status(400).json({ error: 'Invalid password' });
      }
    } else {
      res.status(400).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
);

// LOGIN: PEGAR TOKEN
router.get('/me', async (req, res) => {
  try {
    let token = req.headers['authorization'].split(' ')[1];
    let decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.teacher = decoded;
    next();
  } catch(error) {
    res.status(401).json({ error: 'Unauthorized' });
  }
},
async (req, res) => {
  const teacher = await Teacher.findByPk(req.teacher.id);
  if(!teacher) {
    res.status(404).json({ error: 'Teacher not found' });
  } else {
    res.status(200).json(teacher);
  }
});

export default router;
