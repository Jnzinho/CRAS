import express from 'express';
import Class from '../models/classModel';
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
  const { code, description } = req.body;
  if (!code || !description) {
    res
      .status(400)
      .json({ error: 'Missing required fields: code and description' });
    return;
  }
  try {
    const class1 = {
      code,
      description,
    };
    const createdClass = await Class.create(class1);
    res.status(201).json({
      id: createdClass.id,
      code: createdClass.code,
      description: createdClass.description,
    });
  } catch (error) {
    console.error('Error creating classes:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update por id
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { code, description } = req.body;
  if (!code || !description) {
    res
      .status(400)
      .json({ error: 'Missing required fields: code and description' });
    return;
  }
  try {
    const classes = await Class.findByPk(id);
    if (!classes) {
      res.status(404).json({ error: 'Class not found' });
    } else {
      classes.description = description;
      classes.code = code;
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
