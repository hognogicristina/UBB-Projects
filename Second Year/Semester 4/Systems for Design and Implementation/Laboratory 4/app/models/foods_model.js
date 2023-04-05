const { Sequelize, Model, DataTypes } = require('sequelize');
const mysql2 = require('mysql2')

const sequelize = new Sequelize('bo8dhdnecmi9kqgy6joa', 'utjidt7rdyxmke4r', 'YRtSHxz0xzXW2m5UY4rT', {
    host: 'bo8dhdnecmi9kqgy6joa-mysql.services.clever-cloud.com',
    dialect: 'mysql',
    dialectModule: mysql2,
    port: 3306
})

class foods extends Model { }

foods.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    brand: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    type: {
        type: DataTypes.STRING(10),
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'foods',
    timestamps: false
})

module.exports = foods