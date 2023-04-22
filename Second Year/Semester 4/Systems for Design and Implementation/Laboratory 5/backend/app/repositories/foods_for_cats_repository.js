const foods_for_cats = require('../models/foods_for_cats_model.js');
const db = require('../database/foods_for_cats_database.js');

var foodsCats = [];

module.exports = {
    genFoodCat: function () {
        foodsCats = []

        let foodCat1 = new foods_for_cats({ id: 1, catId: 2, foodId: 5, purchased: "2019-01-01", place: "Washington" })
        let foodCat2 = new foods_for_cats({ id: 2, catId: 2, foodId: 10, purchased: "2020-02-02", place: "Los Angeles" })
        let foodCat3 = new foods_for_cats({ id: 3, catId: 2, foodId: 8, purchased: "2021-03-03", place: "Chicago" })
        let foodCat4 = new foods_for_cats({ id: 4, catId: 3, foodId: 2, purchased: "2022-03-04", place: "Houston" })
        let foodCat5 = new foods_for_cats({ id: 5, catId: 3, foodId: 5, purchased: "2023-03-04", place: "Philadelphia" })
        let foodCat6 = new foods_for_cats({ id: 6, catId: 5, foodId: 3, purchased: "2022-03-04", place: "Phoenix" })
        let foodCat7 = new foods_for_cats({ id: 7, catId: 4, foodId: 3, purchased: "2023-04-04", place: "San Antonio" })
        let foodCat8 = new foods_for_cats({ id: 8, catId: 6, foodId: 4, purchased: "2021-04-30", place: "San Diego" })
        let foodCat9 = new foods_for_cats({ id: 9, catId: 8, foodId: 4, purchased: "2020-07-12", place: "Dallas" })
        let foodCat10 = new foods_for_cats({ id: 10, catId: 8, foodId: 5, purchased: "2018-11-07", place: "San Jose" })
        let foodCat11 = new foods_for_cats({ id: 11, catId: 7, foodId: 6, purchased: "2023-12-15", place: "Austin" })
        let foodCat12 = new foods_for_cats({ id: 12, catId: 6, foodId: 7, purchased: "2012-02-15", place: "Jacksonville" })
        let foodCat13 = new foods_for_cats({ id: 13, catId: 8, foodId: 8, purchased: "2015-12-15", place: "San Francisco" })
        let foodCat14 = new foods_for_cats({ id: 14, catId: 9, foodId: 9, purchased: "2019-02-14", place: "Indianapolis" })
        let foodCat15 = new foods_for_cats({ id: 15, catId: 10, foodId: 10, purchased: "2010-07-19", place: "Columbus" })
        let foodCat16 = new foods_for_cats({ id: 16, catId: 10, foodId: 10, purchased: "2020-09-05", place: "Charlotte" })
        let foodCat17 = new foods_for_cats({ id: 17, catId: 11, foodId: 9, purchased: "2021-08-08", place: "Fort Worth" })
        let foodCat18 = new foods_for_cats({ id: 18, catId: 12, foodId: 8, purchased: "2022-04-03", place: "Detroit" })
        let foodCat19 = new foods_for_cats({ id: 19, catId: 13, foodId: 4, purchased: "2022-03-02", place: "El Paso" })
        let foodCat20 = new foods_for_cats({ id: 20, catId: 14, foodId: 5, purchased: "2023-05-01", place: "Memphis" })
        let foodCat21 = new foods_for_cats({ id: 21, catId: 15, foodId: 6, purchased: "2023-06-11", place: "Boston" })
        let foodCat22 = new foods_for_cats({ id: 22, catId: 15, foodId: 7, purchased: "2023-07-18", place: "Seattle" })

        foodsCats.push(foodCat1)
        foodsCats.push(foodCat2)
        foodsCats.push(foodCat3)
        foodsCats.push(foodCat4)
        foodsCats.push(foodCat5)
        foodsCats.push(foodCat6)
        foodsCats.push(foodCat7)
        foodsCats.push(foodCat8)
        foodsCats.push(foodCat9)
        foodsCats.push(foodCat10)
        foodsCats.push(foodCat11)
        foodsCats.push(foodCat12)
        foodsCats.push(foodCat13)
        foodsCats.push(foodCat14)
        foodsCats.push(foodCat15)
        foodsCats.push(foodCat16)
        foodsCats.push(foodCat17)
        foodsCats.push(foodCat18)
        foodsCats.push(foodCat19)
        foodsCats.push(foodCat20)
        foodsCats.push(foodCat21)
        foodsCats.push(foodCat22)

        foodsCats.forEach((foodCat) => {
            db.addFoodCat(foodCat.dataValues)
        })
    },

    getFoodCat: async function () {
        return await db.getFoodCat()
    },

    getOneFoodCat: async function (id) {
        return await db.getOneFoodCatById(id)
    },

    createFoodCat: async function (id, foodId, catId, purchased, place) {
        let newFoodCat = new foods_for_cats({id: id, foodId: foodId, catId: catId, purchased: purchased, place: place})
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