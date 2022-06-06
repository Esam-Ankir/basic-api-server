'use strict';
const express = require('express');
const { Food } = require('../models/index');
const foodRouter = express.Router();
// const validator = require('../middleware/validator');

foodRouter.get('/food', getFoods);
// app.get("/food", validator, (req, res) => {getFoods});
foodRouter.get('/food/:id', getOneFood);
foodRouter.post('/food', addOneFood);
foodRouter.put('/food/:id', updateFood);
foodRouter.delete('/food/:id', deleteFood);

async function getFoods(req, res) {
  const foods = await Food.findAll();
  res.status(200).json(foods);
}
async function getOneFood(req, res) {
  const foodId = parseInt(req.params.id);
  const food = await Food.findOne({ where: { id: foodId } });
  res.status(200).json(food);
}
async function addOneFood(req, res) {
  const newFood = req.body;
  const food = await Food.create(newFood);
  res.status(201).json(food);
}
async function updateFood(req, res) {
  const foodId = parseInt(req.params.id);
  const updateFood = req.body;
  const foundFood = await Food.findOne({ where: { id: foodId } });
  if (foundFood) {
    const updatedFood = await foundFood.update(updateFood);
    res.status(201).json(updatedFood);
  } else {
    res.status(404).json({ message: 'Food not found' });
  }
}
async function deleteFood(req, res) {
  const foodId = parseInt(req.params.id);
  const foundFood = await Food.findOne({ where: { id: foodId } });
  if (foundFood) {
    await foundFood.destroy();
    res.status(204).json({ message: 'Food deleted' });
  } else {
    res.status(404).json({ message: 'Food not found' });
  }
}
module.exports = foodRouter;

