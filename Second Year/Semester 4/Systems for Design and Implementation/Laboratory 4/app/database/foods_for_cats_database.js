const foods_for_cats = require('../models/foods_for_cats_model.js')
const mysql2 = require('mysql2')

const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('bo8dhdnecmi9kqgy6joa', 'utjidt7rdyxmke4r', 'YRtSHxz0xzXW2m5UY4rT', {
    host: 'bo8dhdnecmi9kqgy6joa-mysql.services.clever-cloud.com',
    dialect: 'mysql',
    dialectModule: mysql2,
    port: 3306
})

sequelize.authenticate()

async function getFoodCat() {
    return foods_for_cats.findAll()
}

async function getOneFoodCatById(id) {
    return foods_for_cats.findOne({ where: { id: id } })
}

async function countRowsFoodCat() {
    return foods_for_cats.count()
}

async function addFoodCat(food_for_cat) {
    return foods_for_cats.create(food_for_cat)
}

async function deleteFoodCat(id) {
    return foods_for_cats.destroy({ where: { id: id } })
}

async function updateFoodCat(food_for_cat) {
    return foods_for_cats.update(
        { catId: food_for_cat.catId, foodId: food_for_cat.foodId, purchased: food_for_cat.purchased, place: food_for_cat.place },
        { where: { id: food_for_cat.id } })
}

module.exports = {
    getFoodCat: getFoodCat,
    getOneFoodCatById: getOneFoodCatById,
    countRowsFoodCat: countRowsFoodCat,
    addFoodCat: addFoodCat,
    deleteFoodCat: deleteFoodCat,
    updateFoodCat: updateFoodCat
}