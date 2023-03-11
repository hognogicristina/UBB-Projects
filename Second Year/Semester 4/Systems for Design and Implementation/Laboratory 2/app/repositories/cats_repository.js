const Cat = require("../models/cats_model.js")
const db = require("../database/cats_database.js")

var cats = []

module.exports = {
    gen: function () {
        cats = []

        let cat1 = new Cat(1, "Mittens", 3, 'white', 'Persian', 10, 1)
        let cat2 = new Cat(2, "Fluffy", 4, 'black', 'Bombay', 8, 2)
        let cat3 = new Cat(3, "Patches", 2, 'brown', 'Tabby', 6, 3)
        let cat4 = new Cat(4, "Zoe", 1, 'white', 'Khao Manee', 3, 1)

        cats.push(cat1)
        cats.push(cat2)
        cats.push(cat3)
        cats.push(cat4)

        cats.forEach((cat) => {
            db.addCat(cat)
        })
    },

    get: async function () {
        return await db.getCats()
    },

    getOne: async function (id) {
        return await db.getOneCatById(id)
    },

    create: async function (id, name, age, color, breed, weight, ownerId) {
        let newCat = new Cat(id, name, age, color, breed, weight, ownerId)

        return await db.addCat(newCat)
    },

    delete: async function (id) {
        return await db.deleteCat(id)
    },

    update: async function (id, name, age, color, breed, weight, ownerId) {
        let index = cats.findIndex(el => el.id == id)

        cats[index] = {
			id: parseInt(id),
			name: name,
            age: age,
            color: color,
            breed: breed,
            weight: weight,
            ownerId: ownerId
		}

        return await db.updateCat(cats[index])
    },

    filterByWeight: async function (weight) {
        return await db.filterCatsByWeight(weight)
    },

}