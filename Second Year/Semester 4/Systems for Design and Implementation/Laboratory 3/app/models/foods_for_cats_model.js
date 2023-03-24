// many to many relationship between cats and foods
// many cats can eat the same food, and many foods can be eaten by the same cat

const { Sequelize, Model, DataTypes } = require('sequelize');

const sequelize = new Sequelize('meow', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3307,
})

class Foods_for_cats extends Model { }

Foods_for_cats.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
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
    modelName: 'Foods_for_cats',
    timestamps: false
})

module.exports = Foods_for_cats
