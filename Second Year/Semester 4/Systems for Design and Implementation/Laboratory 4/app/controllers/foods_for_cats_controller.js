var repo = require("../repositories/foods_for_cats_repository.js")

var validate = require("../validations/validater.js")
var validateFoodCat = require("../validations/validate_food_for_cat.js")

module.exports = {
    getFoodCat: function (_, res) {
        repo.getFoodCat().then(foodCat => {
            res.send({
                success: true,
                message: "Food for cat found successfully",
                data: foodCat
            })
        })
    },

    genFoodCat: function () {
        repo.genFoodCat()
    },

    getOneFoodCat: function (req, res) {
        var id = req.params.id

        repo.getOneFoodCat(id).then(foodCat => {
            if (foodCat) {
                res.send({
                    success: true,
                    message: "Food for cat found successfully",
                    data: foodCat
                })
            } else {
                res.send({
                    success: false,
                    message: "Food for cat not found"
                })
            }
        })
    },

    createFoodCat: function (req, res) {
        var id = req.body.id
        var catId = req.body.catId
        var foodId = req.body.foodId
        var purchased = req.body.purchased
        var place = req.body.place

        validateFoodCat.validateFoodForCat(req.body, "add").then(result => {
            if (result == null) {
                repo.createFoodCat(id, catId, foodId, purchased, place)
                res.send({
                    success: true,
                    message: "Food for cat created successfully"
                })
            } else {
                res.send({
                    success: false,
                    message: result
                })
            }
        })
    },

    deleteFoodCat: function (req, res) {
        var id = req.params.id

        validate.isIdInUse(id, "foodForCat").then(foodCat => {
            if (foodCat) {
                repo.deleteFoodCat(id)
                res.send({
                    success: true,
                    message: "Food for cat deleted successfully"
                })
            } else {
                res.send({
                    success: false,
                    message: "Food for cat not found"
                })
            }
        })
    },

    updateFoodCat: function (req, res) {
        var id = req.params.id
        var catId = req.body.catId
        var foodId = req.body.foodId
        var purchased = req.body.purchased
        var place = req.body.place

        validate.isIdInUse(id, "foodForCat").then(foodCat => {
            if (foodCat) {
                validateFoodCat.validateFoodForCat(req.body, "update").then(result => {
                    if (result == null) {
                        repo.updateFoodCat(id, catId, foodId, purchased, place)
                        res.send({
                            success: true,
                            message: "Food for cat updated successfully"
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
                    message: "Food for cat not found"
                })
            }
        })
    }
}