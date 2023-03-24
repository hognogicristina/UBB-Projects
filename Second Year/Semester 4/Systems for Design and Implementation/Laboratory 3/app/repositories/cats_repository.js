const Cat = require("../models/cats_model.js")
const db = require("../database/cats_database.js")

var cats = []

module.exports = {
    genCat: function () {
        cats = []

        let cat1 = new Cat(1, "Mittens", 3, 'white', 'Persian', 10, 1)
        let cat2 = new Cat(2, "Fluffy", 4, 'black', 'Bombay', 8, 10)
        let cat3 = new Cat(3, "Patches", 2, 'brown', 'Tabby', 6, 3)
        let cat4 = new Cat(4, "Zoe", 1, 'white', 'Khao Manee', 3, 10)
        let cat5 = new Cat(5, "Misty", 5, 'black', 'Siamese', 9, 2)
        let cat6 = new Cat(6, "Smokey", 2, 'brown', 'Tabby', 6, 9)
        let cat7 = new Cat(7, "Tiger", 3, 'white', 'Persian', 10, 1)
        let cat8 = new Cat(8, "Shadow", 4, 'black', 'Bombay', 8, 4)
        let cat9 = new Cat(9, "Oreo", 2, 'brown', 'Tabby', 6, 4)
        let cat10 = new Cat(10, "Socks", 1, 'white', 'Khao Manee', 3, 8)
        let cat11 = new Cat(11, "Snowball", 5, 'black', 'Siamese', 9, 5)
        let cat12 = new Cat(12, "Salem", 2, 'brown', 'Tabby', 6, 6)
        let cat13 = new Cat(13, "Sylvester", 3, 'white', 'Persian', 10, 7)
        let cat14 = new Cat(14, "Garfield", 4, 'black', 'Bombay', 8, 8)
        let cat15 = new Cat(15, "Tom", 2, 'brown', 'Tabby', 6, 9)

        cats.push(cat1)
        cats.push(cat2)
        cats.push(cat3)
        cats.push(cat4)
        cats.push(cat5)
        cats.push(cat6)
        cats.push(cat7)
        cats.push(cat8)
        cats.push(cat9)
        cats.push(cat10)
        cats.push(cat11)
        cats.push(cat12)
        cats.push(cat13)
        cats.push(cat14)
        cats.push(cat15)

        cats.forEach((cat) => {
            db.addCat(cat)
        })
    },

    getCat: async function () {
        return await db.getCats()
    },

    getOneCat: async function (id) {
        return await db.getOneCatById(id)
    },

    createCat: async function (id, name, age, color, breed, weight, ownerId) {
        let newCat = new Cat({ id: id, name: name, age: age, color: color, breed: breed, weight: weight, ownerId: ownerId })
        return await db.addCat(newCat.dataValues)
    },

    deleteCat: async function (id) {
        return await db.deleteCat(id)
    },

    updateCat: async function (id, name, age, color, breed, weight, ownerId) {
        let index = cats.filter(el => el.id == id)

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

    filterCatByWeight: async function (weight) {
        return await db.filterCatsByWeight(weight)
    },

    getStatisticReport: async function () {
        return await db.getStatisticReport()
    }
}