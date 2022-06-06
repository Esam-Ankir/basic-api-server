"use strict";

// Our table schema
const Clothes = (sequelize, DataTypes) =>
    sequelize.define("clothe", {
        clotheName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        clotheSize: {
            type: DataTypes.STRING,
        },
        clotheColor: {
            type: DataTypes.STRING,
        },
    });

module.exports = Clothes;