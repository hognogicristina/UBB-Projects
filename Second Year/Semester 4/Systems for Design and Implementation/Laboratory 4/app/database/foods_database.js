const Foods = require('../models/foods_model.js')

const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('meow', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3307,
})

sequelize.authenticate()

async function getFoods() {
    return Foods.findAll()
}

async function getOneFoodById(id) {
    return Foods.findOne({ where: { id: id } })
}

async function countRowsFood() {
    return Foods.count()
}

async function addFood(food) {
    return Foods.create(food)
}

async function deleteFood(id) {
    return Foods.destroy({ where: { id: id } })
}

async function updateFood(food) {
    return Foods.update(
        { name: food.name, brand: food.brand, price: food.price, quantity: food.quantity, type: food.type },
        { where: { id: food.id } })
}

module.exports = {
    getFoods: getFoods,
    getOneFoodById: getOneFoodById,
    countRowsFood: countRowsFood,
    addFood: addFood,
    deleteFood: deleteFood,
    updateFood: updateFood
}