const Validation = require('../validations/validater.js')

class ValidationFood {
    static async validateFoodAdd(food) {
        var id = food.id
        var name = food.name
        var brand = food.brand
        var price = food.price
        var quantity = food.quantity
        var type = food.type
    
        if (id == null) {
            return "Id is required"
        } else if (name == null) {
            return "Name is required"
        } else if (brand == null) {
            return "Brand is required"
        } else if (price == null) {
            return "Price is required"
        } else if (quantity == null) {
            return "Quantity is required"
        } else if (type == null) {
            return "Type is required"
        } else if (!Validation.validateName(name)) {
            return "Name should have at least 3 letters"
        } else if (!Validation.validateName(brand)) {
            return "Brand should have at least 3 letters"
        } else if (!Validation.validateNumber(price)) {
            return "Price is a number greater than 0"
        } else if (!Validation.validateNumber(quantity)) {
            return "Quantity is a number greater than 0"
        } else if (!Validation.validateName(type)) {
            return "Type should have at least 3 letters"
        } else if (await Validation.isIdInUse(id, "food")) {
            return "Id is already in use"
        } else {
            return null
        }
    }

    static async validateFoodUpdate(food) {
        var name = food.name
        var brand = food.brand
        var price = food.price
        var quantity = food.quantity
        var type = food.type
    
        if (name == null) {
            return "Name is required"
        } else if (brand == null) {
            return "Brand is required"
        } else if (price == null) {
            return "Price is required"
        } else if (quantity == null) {
            return "Quantity is required"
        } else if (type == null) {
            return "Type is required"
        } else if (!Validation.validateName(name)) {
            return "Name should have at least 3 letters"
        } else if (!Validation.validateName(brand)) {
            return "Brand should have at least 3 letters"
        } else if (!Validation.validateNumber(price)) {
            return "Price is a number greater than 0"
        } else if (!Validation.validateNumber(quantity)) {
            return "Quantity is a number greater than 0"
        } else if (!Validation.validateName(type)) {
            return "Type should have at least 3 letters"
        } else {
            return null
        }
    }

    static async validateFood(food, type) {
        if (type == "add") {
            return await ValidationFood.validateFoodAdd(food)
        } else if (type == "update") {
            return await ValidationFood.validateFoodUpdate(food)
        }
            
        return null
    }
}

module.exports = ValidationFood