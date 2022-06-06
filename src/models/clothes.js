"use strict";

// Our table schema
const Clothes = (sequelize, DataTypes) =>
    sequelize.define("clothes", {
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