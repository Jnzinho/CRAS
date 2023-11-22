import express from 'express';
import Teacher from '../models/teacherModel';
import bcrypt from 'bcrypt';
import { Jwt } from 'jsonwebtoken';
import passwordValidator from 'password-validator';

const router = express.Router();

const schema = new passwordValidator();

schema.is().min(8, 'O número mínimo de caracteres é 8.')
.is().max(100, 'Tamanho máximo da senha é 100 caracteres')
.has().uppercase(1, 'Por favor, utilize pelo menos uma letra maíuscula em sua senha')
.has().lowercase(1, 'Por favor, utilize pelo menos uma letra minúscula em sua senha')
.has().not().spaces(1, 'Por favor, Não utilize espaços em sua senha') 

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
  console.log(req);
  console.log(req.body);
  const { name, username, password } = req.body;
  try {
    // TODO: traduzir erros de validação para portugues
    const passwordErrors = schema.validate(password, {details: true});
    if (passwordErrors && passwordErrors.length > 0) {
      return res.status(400).json({ error: passwordErrors[0].message });
    }
    const salt = bcrypt.genSaltSync(10);
    const teacher = {
      name,
      username,
      password: bcrypt.hashSync(password, salt),
    };
    const createdTeacher = await Teacher.create(teacher);
    res.status(201).json({
      id: createdTeacher.id,
      name: createdTeacher.name,
      username: createdTeacher.username,
    });
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
      teacher.updatedAt = new Date();
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
