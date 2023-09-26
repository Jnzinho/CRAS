import express from 'express';
import Video from '../models/videoModel';
import bcrypt from 'bcrypt';
import { Jwt } from 'jsonwebtoken';

const router = express.Router();

// Get Todos os professores
router.get('/', async (req, res) => {
  try {
    const videos = await Video.findAll();
    res.json(videos);
  } catch (error) {
    console.error('Error fetching videos:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Get por ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const video = await Video.findByPk(id);
    if (!video) {
      res.status(404).json({ error: 'Video not found' });
    } else {
      res.json(video);
    }
  } catch (error) {
    console.error('Error fetching video:', error);
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
    const video = {
      name,
      username,
      password: bcrypt.hashSync(password, salt),
    };
    const createdVideo = await Video.create(video);
    res.status(201).json({
      id: createdVideo.id,
      name: createdVideo.name,
      username: createdVideo.username,
    });
  } catch (error) {
    console.error('Error creating video:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update por id
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, username, hashedPassword } = req.body;
  try {
    const video = await Video.findByPk(id);
    if (!video) {
      res.status(404).json({ error: 'Video not found' });
    } else {
      video.name = name;
      video.username = username;
      video.hashedPassword = hashedPassword;
      await video.save();
      res.json(video);
    }
  } catch (error) {
    console.error('Error updating video:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Deletar
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const video = await Video.findByPk(id);
    if (!video) {
      res.status(404).json({ error: 'Video not found' });
    } else {
      await video.destroy();
      res.status(204).end();
    }
  } catch (error) {
    console.error('Error deleting video:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
