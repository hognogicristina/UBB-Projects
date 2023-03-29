const Validation = require('../validations/validater.js')

class ValidationOwner {
    static async validateOwnerAdd(owner) {
        var id = owner.id
        var firstName = owner.firstName
        var lastName = owner.lastName
        var address = owner.address
        var phone = owner.phone
        var email = owner.email
        var age = owner.age

        if (id == null) {
            return "Id is required"
        } else if (firstName == null) {
            return "First name is required"
        } else if (lastName == null) {
            return "Last name is required"
        } else if (address == null) {
            return "Address is required"
        } else if (phone == null) {
            return "Phone is required"
        } else if (email == null) {
            return "Email is required"
        } else if (age == null) {
            return "Age is required"
        } else if (!Validation.validateName(firstName)) {
            return "First name should have at least 3 letters"
        } else if (!Validation.validateName(lastName)) {
            return "Last name should have at least 3 letters"
        } else if (!Validation.validatePhone(phone)) {
            return "Phone should be a number with 8 digits long"
        } else if (!Validation.validateEmail(email)) {
            return "Email does not have the correct format (e.g.: email@gmail.com/ email@yahoo.com)"
        } else if (!Validation.validateNumber(age)) {
            return "Age is a number greater than 0"
        } else if (await Validation.isIdInUse(id, "owner")) {
            return "Id is already in use"
        } else if (await Validation.isEmailInUse(email)) {
            return "Email is already in use"
        } else if (await Validation.isPhoneInUse(phone)) {
            return "Phone is already in use"
        } else {
            return null
        }
    }

    static async validateOwnerUpdate(owner) {
        var firstName = owner.firstName
        var lastName = owner.lastName
        var address = owner.address
        var phone = owner.phone
        var email = owner.email
        var age = owner.age

        if (firstName == null) {
            return "First name is required"
        } else if (lastName == null) {
            return "Last name is required"
        } else if (address == null) {
            return "Address is required"
        } else if (phone == null) {
            return "Phone is required"
        } else if (email == null) {
            return "Email is required"
        } else if (age == null) {
            return "Age is required"
        } else if (!Validation.validateName(firstName)) {
            return "First name should be at least 3 characters long and only contain letters"
        } else if (!Validation.validateName(lastName)) {
            return "Last name should be at least 3 characters long and only contain letters"
        } else if (!Validation.validatePhone(phone)) {
            return "Phone should be 8 digits long"
        } else if (!Validation.validateEmail(email)) {
            return "Email does not have the correct format (e.g.: email@gmail.com/ email@yahoo.com)"
        } else if (!Validation.validateAge(age)) {
            return "Age should be 1 or higher"
        } else if (await Validation.isEmailInUse(email)) {
            return "Email is already in use"
        } else if (await Validation.isPhoneInUse(phone)) {
            return "Phone is already in use"
        } else {
            return null
        }
    }

    static async validateOwner(owner, type) {
        if (type == "add") {
            return await ValidationOwner.validateOwnerAdd(owner)
        } else if (type == "update") {
            var id = owner.id
            return await ValidationOwner.validateOwnerUpdate(owner)
        }

        return null
    }
}

module.exports = ValidationOwner