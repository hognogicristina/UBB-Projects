var repo = require("../repositories/repository.js")

module.exports = {
    get: function (_, res) {
        res.send({
            success: 1,
            message: "Initial repository of cats",
            data: repo.get()
        })
    },

    gen: function (_, res) {
        repo.gen()
        res.send({
            success: 1,
            message: "Repository of cats generated successfully",
            data: repo.get()
        })
    },

    create: function (req, res) {
        var id = repo.get().length + 1
        var name = req.body.name
        var age = req.body.age
        var color = req.body.color
        var breeds = req.body.breeds
        var weight = req.body.weight

        repo.create(id, name, age, color, breeds, weight)

        res.send({
            success: 1,
            message: "Cat added successfully"
        })
    },

    update: function (req, res) {
        var id = req.params.id
        var name = req.body.name
        var age = req.body.age
        var color = req.body.color
        var breeds = req.body.breeds
        var weight = req.body.weight

        if (name) {
            repo.update(id, name, age, color, breeds, weight)

            res.send({
                success: 1,
                message: "Cat updated successfully"
            })
        }
    },

    delete: function (req, res) {
        var id = req.params.id
        var newCats = repo.get().filter(el => el.id != id)

        repo.delete(newCats)

        res.send({
            success: 1,
            message: "Cat deleted successfully"
        })
    }
}