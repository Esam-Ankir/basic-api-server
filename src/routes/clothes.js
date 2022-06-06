"use strict";
const express = require("express");
const { Clothes } = require("../models/clothes");
const clothesRouter = express.Router();
// const validator = require('../middleware/validator');

clothesRouter.get("/clothes", getClothes);
// app.get("/clothes", validator, (req, res) => {getClothes});
clothesRouter.get("/clothes/:id", getOneClothe);
clothesRouter.post("/clothes", createClothes);
clothesRouter.put("/clothes/:id", updateClothe);
clothesRouter.delete("/clothes/:id", deleteClothe);


async function getClothes(req, res) {
    const allClothes = await Clothes.findAll();
    res.status(200).json(allClothes);
}

async function getOneClothe(req, res) {
    const clotheId = parseInt(req.params.id);
    let food = await Clothes.findOne({ where: { id: clotheId } });
    res.status(200).json(food);
}

async function createClothes(req, res) {
    let newFood = req.body;
    let food = await Clothes.create(newFood);
    res.status(201).json(food);
}

async function updateClothe(req, res) {
    let clotheId = parseInt(req.params.id);
    let updateClothe = req.body; 
    let foundClothe = await Clothes.findOne({ where: { id: clotheId } });
    if (foundClothe) {
        let updatedClothe = await foundClothe.update(updateClothe);
        res.status(201).json(updatedClothe);
    } else {
        res.status(404);
    }
}
async function deleteClothe(req, res) {
    let clotheId = parseInt(req.params.id);
    let deleteClothe = await Clothes.destroy({ where: { id: clotheId } });
    res.status(204).json(deleteClothe); 
}
module.exports = clothesRouter;


