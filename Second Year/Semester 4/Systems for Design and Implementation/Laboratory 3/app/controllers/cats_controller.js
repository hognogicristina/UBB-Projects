var repo = require("../repositories/cats_repository.js")

const dbOwner = require("../database/owners_database.js")

module.exports = {
    getCat: function (_, res) {
        repo.getCat().then(cats => {
            res.send({
                success: true,
                message: "Cats found successfully",
                data: cats
            })
        })
    },

    genCat: function (_, _) {
        repo.genCat()
    },

    getOneCat: function (req, res) {
        var id = req.params.id
        
        repo.getOneCat(id).then(cat => {
            dbOwner.getByTypeOwner("id", cat.ownerId).then(owner => {
                cat.dataValues["ownerData"] = {owner: owner}
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
        })
    },

    createCat: function (req, res) {
        var id = req.body.id
        var name = req.body.name
        var age = req.body.age
        var color = req.body.color
        var breed = req.body.breed
        var weight = req.body.weight
        var ownerId = req.body.ownerId

        repo.getOneCat(id).then(cat => {
            if (cat) {
                res.send({
                    success: false,
                    message: "Cat already exists"
                })
            } else {
                repo.createCat(id, name, age, color, breed, weight, ownerId)
                res.send({
                    success: true,
                    message: "Cat created successfully"
                })
            }
        })
    },

    deleteCat: function (req, res) {
        var id = req.params.id

        repo.getOneCat(id).then(cat => {
            if (cat) {
                repo.deleteCat(id)
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

    updateCat: function (req, res) {
        var id = req.params.id
        var name = req.body.name
        var age = req.body.age
        var color = req.body.color
        var breed = req.body.breed
        var weight = req.body.weight
        var ownerId = req.body.ownerId

        repo.getOneCat(id).then(cat => {
            if (cat) {
                repo.updateCat(id, name, age, color, breed, weight, ownerId)
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

    filterCat: function (req, res) {
        var weight = req.params.weight
        
        repo.filterCatByWeight(weight).then(cats => {
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
    },

    getStatistics: function (req, res) {
        repo.getStatisticReport().then(statistics => {
            var newStats = []
            for (var i = 0; i < statistics.length; i++) {
                var stat = statistics[i]
                var ownerName = stat.dataValues.ownerId
                newStats[i] = {
                    "ownerName": ownerName
                }
            }
            if (newStats) {
                res.send({
                    success: true,
                    message: "Statistics found successfully",
                    data: newStats
                })
            } else {
                res.send({
                    success: false,
                    message: "Statistics not found"
                })
            }
        })
    }
}