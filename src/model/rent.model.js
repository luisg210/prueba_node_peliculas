import { DataTypes } from "sequelize";
import { sequelize as db } from "../db/index.js";

const sequelize = db;

export const RentModel = sequelize.define('rent_movie', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    return_movie: {
        type: DataTypes.STRING,
        allowNull: false,
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
    },
    is_return: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
},{
    tableName: 'rent_movie',
    timestamps: false,
    name: 'rent_movie'
});