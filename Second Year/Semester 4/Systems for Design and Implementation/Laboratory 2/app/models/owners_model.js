module.exports = class Owners { // 1 to many relationship: 
                                // 1 owner can have many cats and 1 cat can have 1 owner
    constructor(id, firstName, lastName, address, phone, email) {
        this.id = id
        this.firstName = firstName
        this.lastName = lastName
        this.address = address
        this.phone = phone
        this.email = email
    }
}