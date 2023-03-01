const Cat = require("../models/model.js")

var cats = []

module.exports = {
    gen: function () {
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

    get: function () {
        return cats
    },

    create: function (id, name, age, color, breeds, weight) {
        let newCat = new Cat(id, name, age, color, breeds, weight)

        cats.push(newCat)
    },

    update: function (id, name, age, color, breeds, weight) {
        let index = cats.findIndex(el => el.id == id)

        cats[index] = {
			...cats[index],
			name: name,
            age: age,
            color: color,
            breeds: breeds,
            weight: weight
		}
    },

    delete: function (newCats) {
        cats = newCats
    }
}