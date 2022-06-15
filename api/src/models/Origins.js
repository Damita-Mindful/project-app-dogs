const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('origin', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });
};
