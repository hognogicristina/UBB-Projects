const Foods = require("../models/foods_model.js")
const db = require("../database/foods_database.js")

var foods = []

module.exports = {
    genFood: function () {
        foods = []

        let food1 = new Foods(1, "Purina Pro Plan", "Purina", 50, 15, "dry")
        let food2 = new Foods(2, "Whiskas Chicken Flavour", "Purina", 90, 10, "dry")
        let food3 = new Foods(3, "Royal Canin Kitten", "Royal Canin", 100, 20, "dry")
        let food4 = new Foods(4, "Aatas Cat Ocean Delight Salmon", "Aatas", 70, 15, "dry")
        let food5 = new Foods(5, "ProDiet Chicken & Tuna", "ProDiet", 80, 10, "dry")
        let food6 = new Foods(6, "Kit Cat Wild Caught Tuna & Chicken", "Kit Cat", 100, 15, "wet")
        let food7 = new Foods(7, "Whiskas Poultry Selection", "Purina", 90, 10, "wet")
        let food8 = new Foods(8, "Purina Friskies Pate", "Purina", 100, 20, "wet")
        let food9 = new Foods(9, "Aatas Cat Ocean Delight Salmon", "Aatas", 70, 15, "wet")
        let food10 = new Foods(10, "Feline Gourmet Chicken & Tuna", "Feline Gourmet", 80, 10, "wet")

        foods.push(food1)
        foods.push(food2)
        foods.push(food3)
        foods.push(food4)
        foods.push(food5)
        foods.push(food6)
        foods.push(food7)
        foods.push(food8)
        foods.push(food9)
        foods.push(food10)

        foods.forEach((food) => {
            db.addFood(food)
        })
    },

    getFood: async function () {
        return await db.getFoods()
    },

    getOneFood: async function (id) {
        return await db.getOneFoodById(id)
    },

    createFood: async function (id, name, brand, price, quantity, type) {
        let newFood = new Foods({ id: id, name: name, brand: brand, price: price, quantity: quantity, type: type })
        return await db.addFood(newFood.dataValues)
    },

    deleteFood: async function (id) {
        return await db.deleteFood(id)
    },

    updateFood: async function (id, name, brand, price, quantity, type) {
        let index = foods.findIndex(el => el.id == id)

        foods[index] = {
			id: parseInt(id),
			name: name,
            brand: brand,
            price: price,
            quantity: quantity,
            type: type
		}

        return await db.updateFood(foods[index])
    }
}