const express = require('express');
import { User, removePassword } from '../models/User'
import { Request, Response } from "express";
import { isManger, isAdmin, isArtist } from '../middleware/checkRole';
const router = express.Router();

// Ajouter un artiste
router.post('/addArtist', async (req: Request, res: Response ) => {
  const { name, email, password  } = req.body;
  const role = 'Artist'
  // Vérifie si l'email ou le nom d'utilisateur existe déjà
  const emailExists = await User.exists({ email });
  const usernameExists = await User.exists({ name });

  if (emailExists || usernameExists) {
    return res.status(400).json({ message: 'Email ou nom d\'utilisateur déjà utilisé' });
  }

  // Création d'un nouveau User
  const artist = new User({
    name,
    email,
    password,
    role,
  });

  // Enregistrement du User dans la base de données
  try {
    const savedUser = await artist.save();
    res.json(savedUser);
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de l\'enregistrement du user', error });
  }
});

// Ajouter un nouveau manager
router.post('/addManager', [isAdmin], async (req: Request, res: Response) => {
    try {
        const { name, email, password  } = req.body;
        const role = 'Manager'
      const existingManager = await User.findOne({ email });
      if (existingManager) {
        return res.status(400).json({ message: 'Manager already exists' });
      }
      const manager = new User({
        name,
        email,
        password,
        role,
      });
      await manager.save();
      res.json(manager);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  // Ajouter un nouveau manager
router.post('/addAdmin', async (req: Request, res: Response) => {
  try {
      const { name, email, password  } = req.body;
      const role = 'Admin'
    const existingManager = await User.findOne({ email });
    if (existingManager) {
      return res.status(400).json({ message: 'Manager already exists' });
    }
    const manager = new User({
      name,
      email,
      password,
      role,
    });
    await manager.save();
    res.json(manager);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
export { router as artistRegisterRouter };
  