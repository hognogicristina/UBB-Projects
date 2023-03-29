const Foods = require("../models/foods_model.js")
const db = require("../database/foods_database.js")

var foods = []

module.exports = {
    genFood: function () {
        foods = []

        let food1 = new Foods({ id: 1, name: "Purina Pro Plan", brand: "Purina", price: 50, quantity: 15, type: "dry" })
        let food2 = new Foods({ id: 2, name: "Whiskas Chicken Flavour", brand: "Purina", price: 90, quantity: 10, type: "dry" })
        let food3 = new Foods({ id: 3, name: "Royal Canin Kitten", brand: "Royal Canin", price: 100, quantity: 20, type: "dry" })
        let food4 = new Foods({ id: 4, name: "Aatas Cat Ocean Delight Salmon", brand: "Aatas", price: 70, quantity: 15, type: "dry" })
        let food5 = new Foods({ id: 5, name: "ProDiet Chicken & Tuna", brand: "ProDiet", price: 80, quantity: 10, type: "dry" })
        let food6 = new Foods({ id: 6, name: "Kit Cat Wild Caught Tuna & Chicken", brand: "Kit Cat", price: 100, quantity: 15, type: "wet" })
        let food7 = new Foods({ id: 7, name: "Whiskas Poultry Selection", brand: "Purina", price: 90, quantity: 10, type: "wet" })
        let food8 = new Foods({ id: 8, name: "Purina Friskies Pate", brand: "Purina", price: 100, quantity: 20, type: "wet" })
        let food9 = new Foods({ id: 9, name: "Aatas Cat Ocean Delight Chicken", brand: "Aatas", price: 70, quantity: 15, type: "wet" })
        let food10 = new Foods({ id: 10, name: "Feline Gourmet Chicken & Tuna", brand: "ProDiet", price: 80, quantity: 10, type: "wet" })

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
            db.addFood(food.dataValues)
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