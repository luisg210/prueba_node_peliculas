import { DataTypes } from "sequelize";
import { sequelize as db } from "../db/index.js";

const sequelize = db;

export const MovieModel = sequelize.define('movie', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    image: {
        type: DataTypes.BLOB,
        allowNull: true,
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    rental_price: {
        type: DataTypes.FLOAT(10, 2),
        allowNull: false,
    },
    sale_price: {
        type: DataTypes.FLOAT(10, 2),
        allowNull: false,
    },
    is_available: {
        type: DataTypes.BOOLEAN,
        defaultValue: true  
    },
    likes: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
},{
    tableName: 'movie',
    timestamps: false,
    name: 'movie'
});