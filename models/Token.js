const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Token extends Model {}

Token.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        parks_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'parks',
                key: 'id',
            }
        },
        amenities_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'amenities',
                key: 'id',
            }
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'token', 
    }
);

module.exports = Token;