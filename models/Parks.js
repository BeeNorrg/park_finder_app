const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Parks extends Model {}

Parks.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        latitude: {
            type: DataTypes.DECIMAL(6, 4),
            validate: {
              min: -90,
              max: 90,
            }
        },
        longitude: {
            type: DataTypes.DECIMAL(6, 4),
            validate: {
                min: -180,
                max: 180,
            }
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'parks',
    }
);

module.exports = Parks;