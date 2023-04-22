const Validation = require('../validations/validater.js')

class ValidationCat {
    static async validateCatAdd(cat) {
        var name = cat.name
        var age = cat.age
        var color = cat.color
        var breed = cat.breed
        var weight = cat.weight
        var ownerId = cat.ownerId

        if (name == null) {
            return "Name is required"
        } else if (age == null) {
            return "Age is required"
        } else if (color == null) {
            return "Color is required"
        } else if (breed == null) {
            return "Breed is required"
        } else if (weight == null) {
            return "Weight is required"
        } else if (ownerId == null) {
            return "Owner id is required"
        } else if (!Validation.validateName(name)) {
            return "Name should have at least 3 letters"
        } else if (!Validation.validateNumber(age)) {
            return "Age is a number greater than 0"
        } else if (!Validation.validateName(breed)) {
            return "Breed should have at least 3 letters"
        } else if (!Validation.validateNumber(weight)) {
            return "Weight is a number greater than 0"
        } else if (!Validation.validateName(color)) {
            return "Color should have at least 3 letters"
        } else if (!await Validation.isIdInUse(ownerId, "owner")) {
            return "Owner id does not exist"
        } else {
            return null
        }
    }

    static async validateCatUpdate(cat) {
        var name = cat.name
        var age = cat.age
        var color = cat.color
        var breed = cat.breed
        var weight = cat.weight
        var ownerId = cat.ownerId

        if (name == null) {
            return "Name is required"
        } else if (age == null) {
            return "Age is required"
        } else if (color == null) {
            return "Color is required"
        } else if (breed == null) {
            return "Breed is required"
        } else if (weight == null) {
            return "Weight is required"
        } else if (ownerId == null) {
            return "Owner id is required"
        } else if (!Validation.validateName(name)) {
            return "Name should have at least 3 letters"
        } else if (!Validation.validateNumber(age)) {
            return "Age is a number greater than 0"
        } else if (!Validation.validateName(breed)) {
            return "Breed should have at least 3 letters"
        } else if (!Validation.validateNumber(weight)) {
            return "Weight is a number greater than 0"
        } else if (!Validation.validateName(color)) {
            return "Color should have at least 3 letters"
        } else if (!await Validation.isIdInUse(ownerId, "owner")) {
            return "Owner id does not exist"
        } else {
            return null
        }
    }

    static async validateCat(cat, type) {
        if (type == "add") {
            return await this.validateCatAdd(cat)
        } else if (type == "update") {
            return await this.validateCatUpdate(cat)
        }

        return null
    }
}

module.exports = ValidationCat
