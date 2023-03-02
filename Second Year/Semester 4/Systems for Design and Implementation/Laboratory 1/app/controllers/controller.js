// Controller for cats in which we define the CRUD operations

var repo = require("../repositories/repository.js")

module.exports = {
    gen: function () { // generate 4 cats and add them to the repository
        repo.gen()
    },

    get: function (_, res) { // get all cats generated in the repository at the beginning        
        res.send({
            success: true,
            message: "Repository of cats generated successfully",
            data: repo.get()
        })
    },

    getOne: function (req, res) { // get one cat by id
        var id = req.params.id
        var cat = repo.getOne(id)

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
    },

    create: function (req, res) { // create a new cat and add it to the repository
        var id = repo.get().length + 1
        var name = req.body.name
        var age = req.body.age
        var color = req.body.color
        var breeds = req.body.breeds
        var weight = req.body.weight

        repo.create(id, name, age, color, breeds, weight)

        res.send({
            success: true,
            message: "Cat added successfully"
        })
    },

    delete: function (req, res) { // delete a cat from the repository
        var id = req.params.id
        var newCats = repo.get().filter(el => el.id != id)

        repo.delete(newCats)

        res.send({
            success: true,
            message: "Cat deleted successfully"
        })
    },

    update: function (req, res) { // update a cat from the repository
        var id = req.params.id
        var name = req.body.name
        var age = req.body.age
        var color = req.body.color
        var breeds = req.body.breeds
        var weight = req.body.weight

        if (name) {
            repo.update(id, name, age, color, breeds, weight)

            res.send({
                success: true,
                message: "Cat updated successfully"
            })
        }
    }
}