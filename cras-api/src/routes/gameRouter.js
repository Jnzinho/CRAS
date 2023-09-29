import express from 'express';
import Game from '../models/gameModel';
import bcrypt from 'bcrypt';
import { Jwt } from 'jsonwebtoken';

const router = express.Router();

// Get Todos os professores
router.get('/', async (req, res) => {
  try {
    const games = await Game.findAll();
    res.json(games);
  } catch (error) {
    console.error('Error fetching games:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get por ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const game = await Game.findByPk(id);
    if (!game) {
      res.status(404).json({ error: 'Game not found' });
    } else {
      res.json(game);
    }
  } catch (error) {
    console.error('Error fetching game:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Criar
router.post('/', async (req, res, next) => {
  console.log(req);
  console.log(req.body);
  const { name, description } = req.body;
  try {
    const game = {
      name,
      description,
    };
    const createdGame = await Game.create(game);
    res.status(201).json({
      id: createdGame.id,
      name: createdGame.name,
      description: createdGame.description,
    });
  } catch (error) {
    console.error('Error creating game:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update por id
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  try {
    const game = await Game.findByPk(id);
    if (!game) {
      res.status(404).json({ error: 'Game not found' });
    } else {
      game.name = name;
      game.description = description;
      await game.save();
      res.json(game);
    }
  } catch (error) {
    console.error('Error updating game:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Deletar
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const game = await Game.findByPk(id);
    if (!game) {
      res.status(404).json({ error: 'Game not found' });
    } else {
      await game.destroy();
      res.status(204).end();
    }
  } catch (error) {
    console.error('Error deleting game:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
