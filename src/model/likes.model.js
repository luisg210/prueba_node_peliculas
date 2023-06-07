import { DataTypes } from "sequelize";
import { sequelize as db } from "../db/index.js";

const sequelize = db;

export const LikesModel = sequelize.define('likes', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    email: {
        type: DataTypes.TEXT,
        allowNull: false,
    }, 
    id_movie: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
},{
    tableName: 'likes',
    timestamps: false,
    name: 'likes'
});