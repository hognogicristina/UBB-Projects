var repoOwner = require("../repositories/owners_repository.js")

module.exports = {
    genOwner: function () {
        repoOwner.genOwner()
    },

    getOwner: function (_, res) {   
        repoOwner.getOwner().then(owners => {
            res.send({
                success: true,
                message: "Owners found successfully",
                data: owners
            })
        })
    },

    getOneOwner: function (req, res) {
        var id = req.params.id
        
        repoOwner.getOneOwner(id).then(owner => {
            if (owner) {
                res.send({
                    success: true,
                    message: "Owner found successfully",
                    data: owner
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

        repoOwner.createOwner(id, firstName, lastName, address, phone, email)

        res.send({
            success: true,
            message: "Owner added successfully"
        })
    },

    deleteOwner: function (req, res) {
        var id = req.params.id
        var newOwners = repoOwner.getOwner().filter(el => el.id != id)

        repoOwner.deleteOwner(id, newOwners)

        res.send({
            success: true,
            message: "Owner deleted successfully"
        })
    },

    updateOwner: function (req, res) {
        var id = req.params.id
        var firstName = req.body.firstName
        var lastName = req.body.lastName
        var address = req.body.address
        var phone = req.body.phone
        var email = req.body.email

        repoOwner.updateOwner(id, firstName, lastName, address, phone, email)

        res.send({
            success: true,
            message: "Owner updated successfully"
        })
    }
}