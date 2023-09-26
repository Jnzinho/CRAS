import express from 'express';
import Class from '../models/classesModel';
import bcrypt from 'bcrypt';
import { Jwt } from 'jsonwebtoken';

const router = express.Router();

// Get Todos os professores
router.get('/', async (req, res) => {
  try {
    const classes = await Class.findAll();
    res.json(classes);
  } catch (error) {
    console.error('Error fetching classes:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Get por ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const classes = await Class.findByPk(id);
    if (!classes) {
      res.status(404).json({ error: 'Class not found' });
    } else {
      res.json(classes);
    }
  } catch (error) {
    console.error('Error fetching classes:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Criar
router.post('/', async (req, res, next) => {
  console.log(req);
  console.log(req.body);
  const { name, username, password } = req.body;
  try {
    const salt = bcrypt.genSaltSync(10);
    const classes = {
      name,
      username,
      password: bcrypt.hashSync(password, salt),
    };
    const createdClass = await classes.create(teacher);
    res.status(201).json({
      id: createdClass.id,
      name: createdClass.name,
      username: createdClass.username,
    });
  } catch (error) {
    console.error('Error creating classes:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update por id
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, username, hashedPassword } = req.body;
  try {
    const classes = await Class.findByPk(id);
    if (!classes) {
      res.status(404).json({ error: 'Class not found' });
    } else {
      classes.name = name;
      classes.username = username;
      classes.hashedPassword = hashedPassword;
      await classes.save();
      res.json(classes);
    }
  } catch (error) {
    console.error('Error updating classes:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Deletar
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const classes = await Class.findByPk(id);
    if (!classes) {
      res.status(404).json({ error: 'Class not found' });
    } else {
      await classes.destroy();
      res.status(204).end();
    }
  } catch (error) {
    console.error('Error deleting classes:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
