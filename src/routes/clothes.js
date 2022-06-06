'use strict';
const express = require('express');
const { Clothe } = require('../models/clothes');
const clothesRouter = express.Router();
// const validator = require('../middleware/validator');


clothesRouter.get('/clothe', getClothes);
clothesRouter.get('/clothe/:id', getOneClothe);
clothesRouter.post('/clothe', addClothe);
clothesRouter.put('/clothe/:id', updateClothe);
clothesRouter.delete('/clothe/:id', deleteClothe);
// app.get("/clothes", validator, (req, res) => {getClothes});

async function getClothes(req, res) {
  const clothes = await Clothe.findAll();
  res.status(200).json(clothes);
}
async function getOneClothe(req, res) {
  const clotheId = parseInt(req.params.id);
  const clothe = await Clothe.findOne({ where: { id: clotheId } });
  res.status(200).json(clothe);
}
async function addClothe(req, res) {
  const newClothe = req.body;
  const clothe = await Clothe.create(newClothe);
  res.status(201).json(clothe);
}
async function updateClothe(req, res) {
  const clotheId = parseInt(req.params.id);
  const updateClothe = req.body;
  const foundClothe = await Clothe.findOne({ where: { id: clotheId } });
  if (foundClothe) {
    const updatedClothe = await foundClothe.update(updateClothe);
    res.status(201).json(updatedClothe);
  } else {
    res.status(404).json({ message: 'clothe item is not found' });
  }
}
async function deleteClothe(req, res) {
  const clotheId = parseInt(req.params.id);
  const foundClothe = await Clothe.findOne({ where: { id: clotheId } });
  if (foundClothe) {
    await foundClothe.destroy();
    res.status(204).json({ message: 'clothe item removed' });
  } else {
    res.status(404).json({ message: 'clothe item is not found' });
  }
}
module.exports = clothesRouter;

