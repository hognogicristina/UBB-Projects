var repo = require("../repositories/cats_repository.js")

const dbOwner = require("../database/owners_database.js")
const validation = require("../validations/validater.js")
const validationCat = require("../validations/validate_cat.js")

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

    genCat: function () {
        repo.genCat()
    },

    getOneCat: function (req, res) {
        var id = req.params.id

        repo.getOneCat(id).then(cat => {
            if (cat != null) {
                dbOwner.getByTypeOwner("id", cat.ownerId).then(owner => {
                    cat.dataValues["ownerData"] = { owner: owner }
                    res.send({
                        success: true,
                        message: "Cat found successfully",
                        data: cat
                    })
                })
            } else {
                res.send({
                    success: false,
                    message: "Cat not found"
                })
            }
        })
    },

    createCat: function (req, res) {
        var name = req.body.name
        var age = req.body.age
        var color = req.body.color
        var breed = req.body.breed
        var weight = req.body.weight
        var ownerId = req.body.ownerId

        validationCat.validateCat(req.body, "add").then(result => {
            if (result == null) {
                repo.createCat(name, age, color, breed, weight, ownerId)
                res.send({
                    success: true,
                    message: "Cat created successfully"
                })
            } else {
                res.send({
                    success: false,
                    message: result
                })
            }
        })
    },

    deleteCat: function (req, res) {
        var id = req.params.id

        validation.isIdInUse(id, "cat").then(result => {
            if (result) {
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

        validationCat.validateCat(req.body, "update").then(result => {
            if (result == null) {
                repo.updateCat(id, name, age, color, breed, weight, ownerId)
                res.send({
                    success: true,
                    message: "Cat updated successfully"
                })
            } else {
                res.send({
                    success: false,
                    message: result
                })
            }
        })
    },

    filterCat: function (req, res) {
        var weight

        try {
            if (res === undefined) {
                if (req < 0) {
                    throw new Error()
                }
                weight = parseInt(req);
            } else {
                if (req.params.weight < 0) {
                    throw new Error()
                }
                weight = parseInt(req.params.weight)
            }

            if (weight === 0 || weight % 1 === 0) {
                const listCats = repo.filterCatByWeight(weight).then(cats => {
                    if (res === undefined) {
                        return cats
                    } else {
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
                    }
                })
    
                return listCats
            } else {
                throw new Error()
            }
        } catch (err) {
            res.send({
                success: false,
                message: "Cats not found",
            })
            return
        }
    },

    getStatisticsBreed: function (req, res) {
        var breed

        if (res === undefined) {
            breed = req
        } else {
            breed = req.params.breed
        }

        const listCats = repo.getStatisticReportBreed(breed).then(cats => {
            if (res === undefined) {
                return cats
            } else {
                if (cats) {
                    res.send({
                        success: true,
                        message: "All cats with the " + breed + " breed have been found successfully",
                        data: cats
                    })
                } else {
                    res.send({
                        success: false,
                        message: "No owner name have been found"
                    })
                }
            }
        })

        return listCats
    }
}