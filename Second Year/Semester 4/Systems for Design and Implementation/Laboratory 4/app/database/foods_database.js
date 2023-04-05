const foods = require('../models/foods_model.js')
const mysql2 = require('mysql2')

const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('bo8dhdnecmi9kqgy6joa', 'utjidt7rdyxmke4r', 'YRtSHxz0xzXW2m5UY4rT', {
    host: 'bo8dhdnecmi9kqgy6joa-mysql.services.clever-cloud.com',
    dialect: 'mysql',
    dialectModule: mysql2,
    port: 3306
})

sequelize.authenticate()

async function getFoods() {
    return foods.findAll()
}

async function getOneFoodById(id) {
    return foods.findOne({ where: { id: id } })
}

async function countRowsFood() {
    return foods.count()
}

async function addFood(food) {
    return foods.create(food)
}

async function deleteFood(id) {
    return foods.destroy({ where: { id: id } })
}

async function updateFood(food) {
    return foods.update(
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