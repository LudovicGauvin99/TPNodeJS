import multer from "multer";
import { Request, Response } from "express";
const Model = require('../models/maquette');
const upload = multer({ dest: 'uploads/' });
const express = require('express');
const router = express.Router();

// Ajouté une nouvelle maquette
router.post('/maquettes', upload.single('maquette'), (req: Request, res:Response) => {
    const title  = req.body;
    const artistId = req.body.id
    const fileName = req.body.filename;
  
    const maquette = new Model({
      title,
      artistId,
      fileName
    });
    
    maquette.save((err : any, maquette: any) => {
        if (err) {
          return res.status(500).send(err);
        }
    
        return res.status(200).json(maquette);
      });
});

// Récupérer toutes les maquettes soumises par l'artiste
router.get('/maquettes', async (req: Request, res: Response) => {
    try {
      const artistId = req.body.id;

      const maquettes = await Model.find({ artiste: artistId });
  
      res.json(maquettes);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Une erreur est survenue' });
    }
  });