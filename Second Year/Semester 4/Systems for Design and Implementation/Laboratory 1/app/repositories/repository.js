// Repository for the Cat model in which we define the CRUD operations

const Cat = require("../models/model.js")

var cats = []

module.exports = {
    gen: function () { // generate some cats for testing
        cats = []

        let cat1 = new Cat(1, "Mittens", 3, 'white', 'Persian', 10)
        let cat2 = new Cat(2, "Fluffy", 4, 'black', 'Siamese', 8)
        let cat3 = new Cat(3, "Patches", 2, 'brown', 'Tabby', 6)
        let cat4 = new Cat(4, "Zoe", 1, 'pink', 'Zoitza', 3)

        cats.push(cat1)
        cats.push(cat2)
        cats.push(cat3)
        cats.push(cat4)
    },

    get: function () { // get all cats
        return cats
    },

    getOne: function (id) { // get one cat by id
        return cats.find(el => el.id == id)
    },

    create: function (id, name, age, color, breeds, weight) { // create a new cat and add it to the array
        let newCat = new Cat(id, name, age, color, breeds, weight)

        cats.push(newCat)
    },

    delete: function (newCats) { // delete a cat by id and update the array
        cats = newCats
    },

    update: function (id, name, age, color, breeds, weight) { // update a cat by id and update the array
        let index = cats.findIndex(el => el.id == id)

        cats[index] = {
			...cats[index],
			name: name,
            age: age,
            color: color,
            breeds: breeds,
            weight: weight
		}
    }
}