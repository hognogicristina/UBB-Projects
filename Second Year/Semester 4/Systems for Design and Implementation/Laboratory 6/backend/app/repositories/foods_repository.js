const foods = require("../models/foods_model.js")
const db = require("../database/foods_database.js")

var food = []

module.exports = {
    genFood: function () {
        food = []

        let food1 = new foods({ id: 1, name: "Purina Pro Plan", brand: "Purina", price: 50, quantity: 15, type: "dry" })
        let food2 = new foods({ id: 2, name: "Whiskas Chicken Flavour", brand: "Purina", price: 90, quantity: 10, type: "dry" })
        let food3 = new foods({ id: 3, name: "Royal Canin Kitten", brand: "Royal Canin", price: 100, quantity: 20, type: "dry" })
        let food4 = new foods({ id: 4, name: "Aatas Cat Ocean Delight Salmon", brand: "Aatas", price: 70, quantity: 15, type: "dry" })
        let food5 = new foods({ id: 5, name: "ProDiet Chicken & Tuna", brand: "ProDiet", price: 80, quantity: 10, type: "dry" })
        let food6 = new foods({ id: 6, name: "Kit Cat Wild Caught Tuna & Chicken", brand: "Kit Cat", price: 100, quantity: 15, type: "wet" })
        let food7 = new foods({ id: 7, name: "Whiskas Poultry Selection", brand: "Purina", price: 90, quantity: 10, type: "wet" })
        let food8 = new foods({ id: 8, name: "Purina Friskies Pate", brand: "Purina", price: 100, quantity: 20, type: "wet" })
        let food9 = new foods({ id: 9, name: "Aatas Cat Ocean Delight Chicken", brand: "Aatas", price: 70, quantity: 15, type: "wet" })
        let food10 = new foods({ id: 10, name: "Feline Gourmet Chicken & Tuna", brand: "ProDiet", price: 80, quantity: 10, type: "wet" })

        food.push(food1)
        food.push(food2)
        food.push(food3)
        food.push(food4)
        food.push(food5)
        food.push(food6)
        food.push(food7)
        food.push(food8)
        food.push(food9)
        food.push(food10)

        food.forEach((f) => {
            db.addFood(f.dataValues)
        })
    },

    getFood: async function () {
        return await db.getFoods()
    },

    getOneFood: async function (id) {
        return await db.getOneFoodById(id)
    },

    createFood: async function (id, name, brand, price, quantity, type) {
        let newFood = new foods({ id: id, name: name, brand: brand, price: price, quantity: quantity, type: type })
        return await db.addFood(newFood.dataValues)
    },

    deleteFood: async function (id) {
        return await db.deleteFood(id)
    },

    updateFood: async function (id, name, brand, price, quantity, type) {
        let index = food.findIndex(el => el.id == id)

        food[index] = {
			id: parseInt(id),
			name: name,
            brand: brand,
            price: price,
            quantity: quantity,
            type: type
		}

        return await db.updateFood(food[index])
    }
}