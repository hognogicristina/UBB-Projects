var repoOwner = require("../repositories/owners_repository.js")

const dbCats = require('../database/cats_database.js')
const validation = require('../validations/validater.js')
const validationOwner = require('../validations/validate_owner.js')

module.exports = {
    getOwner: function (_, res) {
        repoOwner.getOwner().then(owners => {
            res.send({
                success: true,
                message: "Owners found successfully",
                data: owners
            })
        })
    },

    genOwner: function () {
        repoOwner.genOwner()
    },

    getOneOwner: function (req, res) {
        var id = req.params.id

        repoOwner.getOneOwner(id).then(owner => {
            if (owner != null) {
                dbCats.getByTypeCat("ownerId", id).then(cats => {
                    owner.dataValues["catsData"] = { noCats: cats.length, cats: cats }
                    res.send({
                        success: true,
                        message: "Owner found successfully",
                        data: owner
                    })
                })
            } else {
                res.send({
                    success: false,
                    message: "Owner not found"
                })
            }
        })
    },

    createOwner: function (req, res) {
        var id = req.body.id
        var firstName = req.body.firstName
        var lastName = req.body.lastName
        var address = req.body.address
        var phone = req.body.phone
        var email = req.body.email
        var age = req.body.age

        validationOwner.validateOwner(req.body, "add").then(result => {
            if (result == null) {
                repoOwner.createOwner(id, firstName, lastName, address, phone, email, age)
                res.send({
                    success: true,
                    message: "Owner created successfully"
                })
            } else {
                res.send({
                    success: false,
                    message: result
                })
            }
        })
    },

    deleteOwner: function (req, res) {
        var id = req.params.id

        validation.isIdInUse(id, "owner").then(owner => {
            if (owner) {
                repoOwner.deleteOwner(id)
                res.send({
                    success: true,
                    message: "Owner deleted successfully"
                })
            } else {
                res.send({
                    success: false,
                    message: "Owner not found"
                })
            }
        })
    },

    updateOwner: function (req, res) {
        var id = req.params.id
        var firstName = req.body.firstName
        var lastName = req.body.lastName
        var address = req.body.address
        var phone = req.body.phone
        var email = req.body.email
        var age = req.body.age

        validation.isIdInUse(id, "owner").then(owner => {
            if (owner) {
                validationOwner.validateOwner(req.body, "update").then(result => {
                    if (result == null) {
                        repoOwner.updateOwner(id, firstName, lastName, address, phone, email, age)
                        res.send({
                            success: true,
                            message: "Owner updated successfully"
                        })
                    } else {
                        res.send({
                            success: false,
                            message: result
                        })
                    }
                })
            } else {
                res.send({
                    success: false,
                    message: "Owner not found"
                })
            }
        })
    },

    getStatistics: function (req, res) {
        const listOwners = repoOwner.getStatisticReport().then(owners => {
            if (req === undefined || res === undefined) {
                return owners
            } else {
                if (owners) {
                    res.send({
                        success: true,
                        message: "All owners order by average age of their cats fetched successfully",
                        data: owners
                    })
                } else {
                    res.send({
                        success: false,
                        message: "Owners not found"
                    })
                }
            }
        })

        return listOwners
    },

    changeOwnerIdOfCats: function (req, res) {
        var ownerid = req.params.id
        var cats_list = req.body.id

        validation.isIdInUse(ownerid, "owner").then(owner => {
            if (owner) {
                repoOwner.changeOwnerIdOfCats(ownerid, cats_list).then(list => {
                    res.send({
                        success: true,
                        message: "Owner id of cats updated successfully",
                        data: list
                    })
                })
            } else {
                res.send({
                    success: false,
                    message: result
                })
            }
        })
    },

    createCatForOwner: function (req, res) {
        var ownerid = req.params.id
        var cats_list = req.body

        validation.isIdInUse(ownerid, "owner").then(owner => {
            if (owner) {
                repoOwner.createCatForOwner(ownerid, cats_list).then(list => {
                    res.send({
                        success: true,
                        message: "For owner created cats successfully and updated owner id of cats"
                    })
                })
            } else {
                res.send({
                    success: false,
                    message: result
                })
            }
        })
    }
}