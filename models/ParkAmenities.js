const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class ParkAmenities extends Model {}

ParkAmenities.init(
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
            },
            field: 'parks_id'
        },
        amenities_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'amenities',
                key: 'id',
            },
            field: 'amenities_id'
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'park_amenities', 
    }
);

module.exports = ParkAmenities;