const Validation = require('../validations/validater.js')

class ValidationFoodForCat {
    static async validateFoodForCatAdd(foodForCat) {
        var id = foodForCat.id
        var foodId = foodForCat.foodId
        var catId = foodForCat.catId
        var purchased = foodForCat.purchased
        var place = foodForCat.place

        if (id == null) {
            return "Id is required"
        } else if (foodId == null) {
            return "Food id is required"
        } else if (catId == null) {
            return "Cat id is required"
        } else if (purchased == null) {
            return "Purchased is required"
        } else if (place == null) {
            return "Place is required"
        } else if (!Validation.validateDate(purchased)) {
            return "Purchased should be a date in the format yyyy-mm-dd"
        } else if (!Validation.validateDateRange(purchased)) {
            return "Purchased should be between 2000-01-01 and today's date"
        } else if (!Validation.validateName(place)) {
            return "Place should be at least 3 characters long and only contains letters"
        } else if (await Validation.isIdInUse(id, "foodForCat")) {
            return "Id is already in use"
        } else if (!await Validation.isIdInUse(foodId, "food")) {
            return "Food id does not exist"
        } else if (!await Validation.isIdInUse(catId, "cat")) {
            return "Cat id does not exist"
        } else {
            return null
        }
    }

    static async validateFoodForCatUpdate(foodForCat) {
        var foodId = foodForCat.foodId
        var catId = foodForCat.catId
        var purchased = foodForCat.purchased
        var place = foodForCat.place

        if (foodId == null) {
            return "Food id is required"
        } else if (catId == null) {
            return "Cat id is required"
        } else if (purchased == null) {
            return "Purchased is required"
        } else if (place == null) {
            return "Place is required"
        } else if (!Validation.validateDate(purchased)) {
            return "Purchased should be a date in the format yyyy-mm-dd"
        } else if (!Validation.validateDateRange(purchased)) {
            return "Purchased should be between 2000-01-01 and today's date"
        } else if (!Validation.validateName(place)) {
            return "Place should be at least 3 characters long and only contains letters"
        } else if (!await Validation.isIdInUse(foodId, "food")) {
            return "Food id does not exist"
        } else if (!await Validation.isIdInUse(catId, "cat")) {
            return "Cat id does not exist"
        } else {
            return null
        }
    }

    static async validateFoodForCat(foodForCat, type) {
        if (type == "add") {
            return await this.validateFoodForCatAdd(foodForCat)
        } else if (type == "update") {
            return await this.validateFoodForCatUpdate(foodForCat)
        }

        return null
    }
}

module.exports = ValidationFoodForCat