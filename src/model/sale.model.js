import { DataTypes } from "sequelize";
import { sequelize as db } from "../db/index.js";

const sequelize = db;

export const SaleModel = sequelize.define('sale_movie', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    id_movie: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    qty: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
},{
    tableName: 'sale_movie',
    timestamps: false,
    name: 'sale_movie'
});