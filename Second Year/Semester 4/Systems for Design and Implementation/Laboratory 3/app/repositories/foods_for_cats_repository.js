const Foods_for_cats = require('../models/foods_for_cats_model.js');
const db = require('../database/foods_for_cats_database.js');

var foodsCats = [];

module.exports = {
    genFoodCat: function () {
        foodsCats = []

        let foodsCats1 = new Foods_for_cats(1, 2, 5, "2019-01-01", "Washington")
        let foodsCats2 = new Foods_for_cats(2, 3, 10, "2020-01-02", "Los Angeles")
        let foodsCats3 = new Foods_for_cats(3, 4, 8, "2021-01-03", "Chicago")
        let foodsCats4 = new Foods_for_cats(4, 5, 2, "2022-01-04", "Houston")
        let foodsCats5 = new Foods_for_cats(5, 6, 5, "2023-01-05", "Philadelphia")
        let foodsCats6 = new Foods_for_cats(6, 7, 3, "2024-01-06", "Phoenix")
        let foodsCats7 = new Foods_for_cats(7, 8, 3, "2025-01-07", "San Antonio")
        let foodsCats8 = new Foods_for_cats(8, 9, 4, "2026-01-08", "San Diego")
        let foodsCats9 = new Foods_for_cats(9, 10, 4, "2027-01-09", "Dallas")
        let foodsCats10 = new Foods_for_cats(10, 11, 6, "2028-01-10", "San Jose")

        foodsCats.push(foodsCats1)
        foodsCats.push(foodsCats2)
        foodsCats.push(foodsCats3)
        foodsCats.push(foodsCats4)
        foodsCats.push(foodsCats5)
        foodsCats.push(foodsCats6)
        foodsCats.push(foodsCats7)
        foodsCats.push(foodsCats8)
        foodsCats.push(foodsCats9)
        foodsCats.push(foodsCats10)

        foodsCats.forEach((foodCat) => {
            db.addFoodCat(foodCat)
        })
    },

    getFoodCat: async function () {
        return await db.getFoodCat()
    },

    getOneFoodCat: async function (id) {
        return await db.getOneFoodCatById(id)
    },

    createFoodCat: async function (id, foodId, catId, purchased, place) {
        let newFoodCat = new Foods_for_cats({id: id, foodId: foodId, catId: catId, purchased: purchased, place: place})
        return await db.addFoodCat(newFoodCat.dataValues)
    },

    deleteFoodCat: async function (id) {
        return await db.deleteFoodCat(id)
    },

    updateFoodCat: async function (id, foodId, catId, purchased, place) {
        let index = foodsCats.findIndex((foodCat) => foodCat.id == id)

        foodsCats[index] = {
            id: parseInt(id),
            catId: parseInt(catId),
            foodId: parseInt(foodId),
            purchased: purchased,
            place: place
        }

        return await db.updateFoodCat(foodsCats[index])
    }
}