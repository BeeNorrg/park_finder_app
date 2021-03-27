const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Amenities extends Model {}

Amenities.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        amenities_name: {
            type: DataTypes.STRING,
            defaultValue: false,
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'amenities'
    }
);

module.exports = Amenities;