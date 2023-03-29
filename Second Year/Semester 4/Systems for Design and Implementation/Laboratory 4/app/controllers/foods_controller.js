var repo = require("../repositories/foods_repository.js")

const validation = require("../validations/validater.js")
const validationFood = require("../validations/validate_food.js")

module.exports = {
    getFood: function (_, res) {
        repo.getFood().then(foods => {
            res.send({
                success: true,
                message: "Foods found successfully",
                data: foods
            })
        })
    },

    genFood: function () {
        repo.genFood()
    },

    getOneFood: function (req, res) {
        var id = req.params.id
        
        repo.getOneFood(id).then(food => {
            if (food) {
                res.send({
                    success: true,
                    message: "Food found successfully",
                    data: food
                })
            } else {
                res.send({
                    success: false,
                    message: "Food not found"
                })
            }
        })
    },

    createFood: function (req, res) {
        var id = req.body.id
        var name = req.body.name
        var brand = req.body.brand
        var price = req.body.price
        var quantity = req.body.quantity
        var type = req.body.type

        validationFood.validateFood(req.body, "add").then(result => {
            if (result == null) {
                repo.createFood(id, name, brand, price, quantity, type)
                res.send({
                    success: true,
                    message: "Food created successfully"
                })
            } else {
                res.send({
                    success: false,
                    message: result
                })
            }
        })
    },

    deleteFood: function (req, res) {
        var id = req.params.id

        validation.validateId(id, "food").then(result => {
            if (result == null) {
                repo.deleteFood(id)
                res.send({
                    success: true,
                    message: "Food deleted successfully"
                })
            } else {
                res.send({
                    success: false,
                    message: "Food not found"
                })
            }
        })
    },

    updateFood: function (req, res) {
        var id = req.params.id
        var name = req.body.name
        var brand = req.body.brand
        var price = req.body.price
        var quantity = req.body.quantity
        var type = req.body.type

        validationFood.validateFood(req.body, "update").then(result => {
            if (result == null) {
                repo.updateFood(id, name, brand, price, quantity, type)
                res.send({
                    success: true,
                    message: "Food updated successfully"
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