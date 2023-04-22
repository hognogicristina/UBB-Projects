// many to many relationship between cats and foods
// many cats can eat the same food, and many foods can be eaten by the same cat

const { Sequelize, Model, DataTypes } = require('sequelize');
const mysql2 = require('mysql2')

const sequelize = new Sequelize('bo8dhdnecmi9kqgy6joa', 'utjidt7rdyxmke4r', 'YRtSHxz0xzXW2m5UY4rT', {
    host: 'bo8dhdnecmi9kqgy6joa-mysql.services.clever-cloud.com',
    dialect: 'mysql',
    dialectModule: mysql2,
    port: 3306
})

class foods_for_cats extends Model { }

foods_for_cats.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    catId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'cats',
            key: 'id'
        }
    },
    foodId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'foods',
            key: 'id'
        }
    },
    purchased: {
        type: DataTypes.DATE,
        allowNull: false
    },
    place: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
}, {
    sequelize,
    modelName: 'foods_for_cats',
    timestamps: false
})

module.exports = foods_for_cats
