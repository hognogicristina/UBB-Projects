var repo = require("../repositories/cats_repository.js")

module.exports = {
    get: function (_, res) {
        repo.get().then(cats => {
            res.send({
                success: true,
                message: "Cats found successfully",
                data: cats
            })
        })
    },

    gen: function (_, _) {
        repo.gen()
    },

    getOne: function (req, res) {
        var id = req.params.id
        
        repo.getOne(id).then(cat => {
            if (cat) {
                res.send({
                    success: true,
                    message: "Cat found successfully",
                    data: cat
                })
            } else {
                res.send({
                    success: false,
                    message: "Cat not found"
                })
            }
        })
    },

    create: function (req, res) {
        var id = req.body.id
        var name = req.body.name
        var age = req.body.age
        var color = req.body.color
        var breed = req.body.breed
        var weight = req.body.weight
        var ownerId = req.body.ownerId

        repo.getOne(id).then(cat => {
            if (cat) {
                res.send({
                    success: false,
                    message: "Cat already exists"
                })
            } else {
                repo.create(id, name, age, color, breed, weight, ownerId)
                res.send({
                    success: true,
                    message: "Cat created successfully"
                })
            }
        })
    },

    delete: function (req, res) {
        var id = req.params.id

        repo.getOne(id).then(cat => {
            if (cat) {
                repo.delete(id)
                res.send({
                    success: true,
                    message: "Cat deleted successfully"
                })
            } else {
                res.send({
                    success: false,
                    message: "Cat not found"
                })
            }
        })
    },

    update: function (req, res) {
        var id = req.params.id
        var name = req.body.name
        var age = req.body.age
        var color = req.body.color
        var breed = req.body.breed
        var weight = req.body.weight
        var ownerId = req.body.ownerId

        repo.getOne(id).then(cat => {
            if (cat) {
                repo.update(id, name, age, color, breed, weight, ownerId)
                res.send({
                    success: true,
                    message: "Cat updated successfully"
                })
            } else {
                res.send({
                    success: false,
                    message: "Cat not found"
                })
            }
        })
    },

    filter: function (req, res) {
        var weight = req.params.weight
        
        repo.filterByWeight(weight).then(cats => {
            if (cats) {
                res.send({
                    success: true,
                    message: "Cats found successfully",
                    data: cats
                })
            } else {
                res.send({
                    success: false,
                    message: "Cats not found"
                })
            }   
        })
    }
}