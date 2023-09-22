import express from 'express';
import Teacher from '../models/teacherModel';
import bcrypt from 'bcrypt';
import { Jwt } from 'jsonwebtoken';

const router = express.Router();

// Get Todos os professores
router.get('/', async (req, res) => {
  try {
    const teachers = await Teacher.findAll();
    res.json(teachers);
  } catch (error) {
    console.error('Error fetching teachers:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Get por ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const teacher = await Teacher.findByPk(id);
    if (!teacher) {
      res.status(404).json({ error: 'Teacher not found' });
    } else {
      res.json(teacher);
    }
  } catch (error) {
    console.error('Error fetching teacher:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Criar
router.post('/', async (req, res, next) => {
  const { name, username, password } = req.body;
  try {
    const salt = bcrypt.genSaltSync(10);
    const teacher = {
      name,
      username,
      password: bcrypt.hashSync(password, salt),
    };
    const createdTeacher = await Teacher.create(teacher);
    res.status(201).json(createdTeacher);
  } catch (error) {
    console.error('Error creating teacher:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update por id
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, username, hashedPassword } = req.body;
  try {
    const teacher = await Teacher.findByPk(id);
    if (!teacher) {
      res.status(404).json({ error: 'Teacher not found' });
    } else {
      teacher.name = name;
      teacher.username = username;
      teacher.hashedPassword = hashedPassword;
      await teacher.save();
      res.json(teacher);
    }
  } catch (error) {
    console.error('Error updating teacher:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Deletar
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const teacher = await Teacher.findByPk(id);
    if (!teacher) {
      res.status(404).json({ error: 'Teacher not found' });
    } else {
      await teacher.destroy();
      res.status(204).end();
    }
  } catch (error) {
    console.error('Error deleting teacher:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
