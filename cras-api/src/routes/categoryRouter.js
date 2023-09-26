import express from 'express';
import Category from '../models/categoryModel';
import bcrypt from 'bcrypt';
import { Jwt } from 'jsonwebtoken';

const router = express.Router();

// Get Todos os professores
router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Get por ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const category = await category.findByPk(id);
    if (!category) {
      res.status(404).json({ error: 'Category not found' });
    } else {
      res.json(category);
    }
  } catch (error) {
    console.error('Error fetching category:', error);
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
    const category = {
      name,
      username,
      password: bcrypt.hashSync(password, salt),
    };
    const createdcategory = await category.create(category);
    res.status(201).json({
      id: createdcategory.id,
      name: createdcategory.name,
      username: createdcategory.username,
    });
  } catch (error) {
    console.error('Error creating category:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update por id
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, username, hashedPassword } = req.body;
  try {
    const category = await category.findByPk(id);
    if (!category) {
      res.status(404).json({ error: 'category not found' });
    } else {
      category.name = name;
      category.username = username;
      category.hashedPassword = hashedPassword;
      await category.save();
      res.json(category);
    }
  } catch (error) {
    console.error('Error updating category:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Deletar
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const category = await category.findByPk(id);
    if (!category) {
      res.status(404).json({ error: 'category not found' });
    } else {
      await category.destroy();
      res.status(204).end();
    }
  } catch (error) {
    console.error('Error deleting category:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
