const Cat = require("../models/cats_model.js")
const db = require("../database/cats_database.js")

var cats = []

module.exports = {
    genCat: function () {
        cats = []

        let cat1 = new Cat({ id: 1, name: "Mittens", age: 3, color: 'white', breed: 'Persian', weight: 10, ownerId: 1 })
        let cat2 = new Cat({ id: 2, name: "Fluffy", age: 4, color: 'black', breed: 'Bombay', weight: 8, ownerId: 10 })
        let cat3 = new Cat({ id: 3, name: "Patches", age: 2, color: 'brown', breed: 'Tabby', weight: 6, ownerId: 3 })
        let cat4 = new Cat({ id: 4, name: "Zoe", age: 1, color: 'white', breed: 'Khao Manee', weight: 3, ownerId: 10 })
        let cat5 = new Cat({ id: 5, name: "Misty", age: 5, color: 'black', breed: 'Siamese', weight: 9, ownerId: 2 })
        let cat6 = new Cat({ id: 6, name: "Smokey", age: 2, color: 'brown', breed: 'Tabby', weight: 6, ownerId: 9 })
        let cat7 = new Cat({ id: 7, name: "Tiger", age: 3, color: 'white', breed: 'Persian', weight: 10, ownerId: 1 })
        let cat8 = new Cat({ id: 8, name: "Shadow", age: 4, color: 'black', breed: 'Bombay', weight: 8, ownerId: 4 })
        let cat9 = new Cat({ id: 9, name: "Oreo", age: 2, color: 'brown', breed: 'Tabby', weight: 6, ownerId: 4 })
        let cat10 = new Cat({ id: 10, name: "Socks", age: 1, color: 'white', breed: 'Khao Manee', weight: 3, ownerId: 8 })
        let cat11 = new Cat({ id: 11, name: "Snowball", age: 5, color: 'black', breed: 'Siamese', weight: 9, ownerId: 5 })
        let cat12 = new Cat({ id: 12, name: "Salem", age: 2, color: 'brown', breed: 'Tabby', weight: 6, ownerId: 6 })
        let cat13 = new Cat({ id: 13, name: "Sylvester", age: 3, color: 'white', breed: 'Persian', weight: 10, ownerId: 7 })
        let cat14 = new Cat({ id: 14, name: "Garfield", age: 4, color: 'black', breed: 'Bombay', weight: 8, ownerId: 9 })
        let cat15 = new Cat({ id: 15, name: "Tom", age: 2, color: 'brown', breed: 'Tabby', weight: 6, ownerId: 9 })

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
            db.addCat(cat.dataValues)
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

    getStatisticReport: async function() {
        return await db.getStatisticReport()
    },

    getStatisticReportBreed: async function (breed) {
        return await db.getStatisticReportBreed(breed)
    }
}